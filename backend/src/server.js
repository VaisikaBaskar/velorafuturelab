const app = require('./app');
const env = require('./config/env');
const { testConnection, closePool } = require('./config/db');

let server;

const startServer = async () => {
  try {
    // 1. Verify PostgreSQL Database Connection
    console.log('[STARTUP] Checking database connection...');
    await testConnection();

    // 2. Start HTTP Listener
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
