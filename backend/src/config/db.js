const { Pool } = require('pg');
const env = require('./env');

const poolConfig = env.DATABASE_URL
  ? {
      connectionString: env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    }
  : {
      host: env.DB_HOST,
      port: env.DB_PORT,
      database: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    };

const pool = new Pool(poolConfig);

// Handle idle pool client errors
pool.on('error', (err) => {
  console.error('[DATABASE] Unexpected idle client error:', err.message);
});

/**
 * Executes a parameterized query using the connection pool
 * @param {string} text - SQL statement with placeholders ($1, $2, ...)
 * @param {Array} params - Array of parameter values
 * @returns {Promise<import('pg').QueryResult>}
 */
const query = async (text, params = []) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    if (!env.isProduction) {
      const duration = Date.now() - start;
      // Truncate SQL query for safe debug logging
      const safeQuery = text.replace(/\s+/g, ' ').trim().slice(0, 80);
      // console.log(`[DB QUERY] ${safeQuery}... (${duration}ms, rows: ${res.rowCount})`);
    }
    return res;
  } catch (error) {
    console.error(`[DATABASE ERROR] Query failed: ${error.message}`);
    throw error;
  }
};

/**
 * Retrieves a client from the pool for manual transaction management
 */
const getClient = async () => {
  const client = await pool.connect();
  return client;
};

/**
 * Closes the connection pool gracefully
 */
const closePool = async () => {
  console.log('[DATABASE] Closing connection pool...');
  await pool.end();
  console.log('[DATABASE] Connection pool closed.');
};

/**
 * Tests the PostgreSQL connection at startup
 */
const testConnection = async () => {
  try {
    const res = await query('SELECT 1 AS connected, current_database() AS db_name;');
    console.log(`[DATABASE] Connected successfully to database: "${res.rows[0].db_name}"`);
    return true;
  } catch (error) {
    console.error('[DATABASE] Connection failed:', error.message);
    throw error;
  }
};

module.exports = {
  pool,
  query,
  getClient,
  closePool,
  testConnection,
};
