const app = require('./app');
const env = require('./config/env');
const { testConnection, closePool, query } = require('./config/db');
const { hashPassword } = require('./utils/password');

let server;

const syncAdminCredentials = async () => {
  try {
    const adminEmail = 'nave08@gmail.com';
    const plainPassword = 'passwordforvelora';
    const passwordHash = await hashPassword(plainPassword);

    // Ensure public.admins exists
    const tableCheck = await query(`
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'admins';
    `);
    if (tableCheck.rows.length === 0) {
      console.log('[STARTUP] admins table does not exist yet. Skipping admin sync.');
      return;
    }

    const naveAdmin = await query(
      'SELECT id FROM public.admins WHERE LOWER(email) = LOWER($1)',
      [adminEmail]
    );

    if (naveAdmin.rows.length > 0) {
      await query(
        'UPDATE public.admins SET password_hash = $1, is_active = true, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [passwordHash, naveAdmin.rows[0].id]
      );
      console.log(`[STARTUP] Admin credentials synchronized for: ${adminEmail}`);
    } else {
      const existing = await query(
        'SELECT id, email FROM public.admins ORDER BY created_at ASC LIMIT 1'
      );
      if (existing.rows.length > 0) {
        await query(
          'UPDATE public.admins SET email = $1, password_hash = $2, is_active = true, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
          [adminEmail, passwordHash, existing.rows[0].id]
        );
        console.log(`[STARTUP] Updated existing admin (${existing.rows[0].email}) to: ${adminEmail}`);
      } else {
        await query(
          'INSERT INTO public.admins (name, email, password_hash, role, is_active) VALUES ($1, $2, $3, $4, true)',
          ['VELORA Lead Administrator', adminEmail, passwordHash, 'superadmin']
        );
        console.log(`[STARTUP] Created new admin record: ${adminEmail}`);
      }
    }
  } catch (err) {
    console.error('[STARTUP] Failed to sync admin credentials:', err.message);
  }
};

const startServer = async () => {
  try {
    // 1. Verify PostgreSQL Database Connection
    console.log('[STARTUP] Checking database connection...');
    await testConnection();

    // 2. Synchronize Administrator Credentials
    await syncAdminCredentials();

    // 3. Start HTTP Listener
    server = app.listen(env.PORT, () => {
      console.log(`===================================================`);
      console.log(` VELORA Future Lab Backend API Server`);
      console.log(` Environment: ${env.NODE_ENV}`);
      console.log(` Listening on: http://localhost:${env.PORT}`);
      console.log(` Health Check: http://localhost:${env.PORT}/api/health`);
      console.log(`===================================================`);
    });
  } catch (error) {
    console.error('[STARTUP ERROR] Server failed to start:', error.message);
    process.exit(1);
  }
};

// Graceful Shutdown Handler
const gracefulShutdown = async (signal) => {
  console.log(`\n[SHUTDOWN] Received ${signal}. Closing server gracefully...`);

  if (server) {
    server.close(async () => {
      console.log('[SHUTDOWN] HTTP server closed.');
      await closePool();
      console.log('[SHUTDOWN] Exiting process.');
      process.exit(0);
    });

    // Force exit if shutdown hangs beyond 10s
    setTimeout(() => {
      console.error('[SHUTDOWN ERROR] Forced shutdown after timeout.');
      process.exit(1);
    }, 10000);
  } else {
    await closePool();
    process.exit(0);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('unhandledRejection', (reason) => {
  console.error('[UNHANDLED REJECTION]', reason);
});

process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]', err);
  process.exit(1);
});

startServer();
