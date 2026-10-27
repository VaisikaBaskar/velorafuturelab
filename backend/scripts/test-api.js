const http = require('http');
const app = require('../src/app');
const env = require('../src/config/env');
const { testConnection, query, closePool } = require('../src/config/db');

const runTests = async () => {
  console.log('====================================================');
  console.log(' VELORA Future Lab - API & DB Verification Runner');
  console.log('====================================================\n');

  // 1. Verify DB Connection
  console.log('[1/7] Testing PostgreSQL Database Connection...');
  await testConnection();
  console.log(' Database connection verified successfully.\n');

  // 2. Verify Schema Unchanged (Check 9 tables exist)
  console.log('[2/7] Verifying Existing PostgreSQL Schema Integrity...');
  const tablesRes = await query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `);
  const tables = tablesRes.rows.map((r) => r.table_name);
  console.log(` Found ${tables.length} tables in public schema:`, tables.join(', '));
  const expected = ['admins', 'blog_categories', 'blog_posts', 'careers', 'contact_submissions', 'job_applications', 'media', 'pages', 'services'];
  const allMatch = expected.every((t) => tables.includes(t));
  if (!allMatch) {
    throw new Error('Schema mismatch: not all expected tables were found');
  }
  console.log(' All 9 tables intact and verified.\n');

  // 3. Start Test HTTP Server
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(` Test server listening on ${baseUrl}\n`);

  let passedCount = 0;
  let testCount = 0;

  const testRequest = async (name, url, options, expectedStatus, validator) => {
    testCount++;
    try {
      const res = await fetch(`${baseUrl}${url}`, options);
      const json = await res.json().catch(() => ({}));
      const statusMatch = res.status === expectedStatus;
      const valid = validator ? validator(json, res) : true;

      if (statusMatch && valid) {
        console.log(` [PASS] ${name} (Status: ${res.status})`);
        passedCount++;
      } else {
        console.error(` [FAIL] ${name} (Expected: ${expectedStatus}, Got: ${res.status})`);
        console.error('        Response:', JSON.stringify(json));
      }
    } catch (err) {
      console.error(` [ERROR] ${name}:`, err.message);
    }
  };

  // 4. Test Health Check
  console.log('[3/7] Testing Health Endpoint...');
  await testRequest('GET /api/health', '/api/health', { method: 'GET' }, 200, (json) => {
    return json.success === true && json.message === 'VELORA Future Lab API is running';
  });

  // 5. Test Public Endpoints
  console.log('\n[4/7] Testing Public GET Endpoints...');
  await testRequest('GET /api/services', '/api/services', { method: 'GET' }, 200, (json) => {
    return json.success === true && Array.isArray(json.data);
  });

  await testRequest('GET /api/services/non-existent-service-slug', '/api/services/non-existent-service-slug', { method: 'GET' }, 404, (json) => {
    return json.success === false;
  });

  await testRequest('GET /api/blog/categories', '/api/blog/categories', { method: 'GET' }, 200, (json) => {
    return json.success === true && Array.isArray(json.data);
  });

  await testRequest('GET /api/blog', '/api/blog', { method: 'GET' }, 200, (json) => {
    return json.success === true && Array.isArray(json.data.posts);
  });

  await testRequest('GET /api/careers', '/api/careers', { method: 'GET' }, 200, (json) => {
    return json.success === true && Array.isArray(json.data);
  });

  // 6. Test Validation Failure Handling
  console.log('\n[5/7] Testing Input Validation Failures...');
  await testRequest(
    'POST /api/contact (Invalid payload - missing message & bad email)',
    '/api/contact',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'A', email: 'not-an-email' }),
    },
    400,
    (json) => json.success === false && json.message.includes('Validation error')
  );

  await testRequest(
    'POST /api/careers/00000000-0000-0000-0000-000000000000/apply (Invalid resume URL)',
    '/api/careers/00000000-0000-0000-0000-000000000000/apply',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Candidate', email: 'candidate@example.com', resume_url: 'not-a-url' }),
    },
    400,
    (json) => json.success === false
  );

  // 7. Test Protected Admin Routes (No Token -> 401 Unauthorized)
  console.log('\n[6/7] Testing Protected Admin Endpoints without Token...');
  await testRequest('GET /api/admin/services (without token)', '/api/admin/services', { method: 'GET' }, 401, (json) => {
    return json.success === false;
  });

  await testRequest('GET /api/admin/blog (without token)', '/api/admin/blog', { method: 'GET' }, 401, (json) => {
    return json.success === false;
  });

  await testRequest('GET /api/admin/careers (without token)', '/api/admin/careers', { method: 'GET' }, 401, (json) => {
    return json.success === false;
  });

  await testRequest('GET /api/admin/applications (without token)', '/api/admin/applications', { method: 'GET' }, 401, (json) => {
    return json.success === false;
  });

  await testRequest('GET /api/admin/contact-submissions (without token)', '/api/admin/contact-submissions', { method: 'GET' }, 401, (json) => {
    return json.success === false;
  });

  await testRequest(
    'POST /api/admin/auth/login (Invalid credentials)',
    '/api/admin/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'nonexistent@velorafuturelab.com', password: 'WrongPassword123!' }),
    },
    401,
    (json) => json.success === false
  );

  // Close server and DB pool
  console.log('\n[7/7] Shutting down test server and DB pool...');
  await new Promise((resolve) => server.close(resolve));
  await closePool();

  console.log(`\n====================================================`);
  console.log(` RESULTS: ${passedCount} / ${testCount} Tests Passed!`);
  console.log(`====================================================`);

  if (passedCount !== testCount) {
    process.exit(1);
  }
};

runTests().catch((err) => {
  console.error('[TEST FATAL ERROR]', err);
  process.exit(1);
});
