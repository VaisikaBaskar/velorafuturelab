const runTests = async () => {
  console.log('====================================================');
  console.log(' VELORA Future Lab - Frontend & API Integration Test');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  const test = async (name, url, options, expectedStatus, validator) => {
    total++;
    try {
      const res = await fetch(url, options);
      const isStatusMatch = res.status === expectedStatus;
      let isValid = true;

      const contentType = res.headers.get('content-type') || '';
      let body;
      if (contentType.includes('application/json')) {
        body = await res.json();
      } else {
        body = await res.text();
      }

      if (validator) {
        isValid = validator(body, res);
      }

      if (isStatusMatch && isValid) {
        console.log(` [PASS] ${name} (HTTP ${res.status})`);
        passed++;
      } else {
        console.error(` [FAIL] ${name} (Expected: ${expectedStatus}, Got: ${res.status})`);
      }
    } catch (err) {
      console.error(` [ERROR] ${name}:`, err.message);
    }
  };

  // 1. Backend API Health
  console.log('[1/4] Testing Backend Connection...');
  await test('Backend Health (GET /api/health)', 'http://localhost:5000/api/health', {}, 200, (json) => {
    return json.success === true && json.message === 'VELORA Future Lab API is running';
  });

  // 2. Public API Data Endpoints
  console.log('\n[2/4] Testing Public Data APIs...');
  await test('Services API (GET /api/services)', 'http://localhost:5000/api/services', {}, 200, (json) => {
    return json.success === true && Array.isArray(json.data);
  });

  await test('Blog API (GET /api/blog)', 'http://localhost:5000/api/blog', {}, 200, (json) => {
    return json.success === true && Array.isArray(json.data.posts);
  });

  await test('Careers API (GET /api/careers)', 'http://localhost:5000/api/careers', {}, 200, (json) => {
    return json.success === true && Array.isArray(json.data);
  });

  // 3. Contact Form Submission to Backend
  console.log('\n[3/4] Testing Contact Form Submission to Backend...');
  await test(
    'Contact Form Submission (POST /api/contact)',
    'http://localhost:5000/api/contact',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Verification Bot',
        email: 'bot@velorafuturelab.com',
        phone: '+1 555-0199',
        company: 'VELORA QA',
        subject: 'Phase 3 Verification',
        message: 'Automated test inquiry verifying Next.js and Express connectivity.',
      }),
    },
    201,
    (json) => json.success === true && json.data.id && json.data.email === 'bot@velorafuturelab.com'
  );

  await test(
    'Contact Form Validation Error (POST /api/contact)',
    'http://localhost:5000/api/contact',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'A',
        email: 'invalid-email',
        message: 'hi',
      }),
    },
    400,
    (json) => json.success === false && json.message.includes('Validation error')
  );

  // 4. Frontend Route Responses
  console.log('\n[4/4] Testing Frontend Routes...');
  await test('Home Page (GET /)', 'http://localhost:3000/', {}, 200, (html) => html.includes('VELORA Future Lab'));
  await test('About Us Page (GET /about-us)', 'http://localhost:3000/about-us', {}, 200, (html) => html.includes('About VELORA'));
  await test('What We Do Page (GET /what-we-do)', 'http://localhost:3000/what-we-do', {}, 200, (html) => html.includes('What We Do'));
  await test('Careers Page (GET /careers)', 'http://localhost:3000/careers', {}, 200, (html) => html.includes('Careers at VELORA'));
  await test('Blog Page (GET /blog)', 'http://localhost:3000/blog', {}, 200, (html) => html.includes('VELORA Insights'));
  await test('Contact Us Page (GET /contact-us)', 'http://localhost:3000/contact-us', {}, 200, (html) => html.includes('Contact Us'));

  console.log('\n====================================================');
  console.log(` RESULTS: ${passed} / ${total} Tests Passed!`);
  console.log('====================================================');

  if (passed !== total) {
    process.exit(1);
  }
};

runTests();
