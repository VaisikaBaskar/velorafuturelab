/**
 * CLI utility to safely provision an administrator account
 * Usage: node scripts/create-admin.js "<name>" "<email>" "<password>" [role]
 */
const { hashPassword } = require('../src/utils/password');
const adminRepository = require('../src/repositories/adminRepository');
const { testConnection, closePool } = require('../src/config/db');

const run = async () => {
  const args = process.argv.slice(2);
  const [name, email, password, role = 'admin'] = args;

  if (!name || !email || !password) {
    console.log('Usage: node scripts/create-admin.js "<name>" "<email>" "<password>" [role]');
    process.exit(1);
  }

  try {
    await testConnection();

    const existing = await adminRepository.findByEmail(email);
    if (existing) {
      console.error(`[ERROR] Admin with email '${email}' already exists.`);
      await closePool();
      process.exit(1);
    }

    const password_hash = await hashPassword(password);
    const newAdmin = await adminRepository.create({
      name,
      email,
      password_hash,
      role,
    });

    console.log('[SUCCESS] Admin account created successfully:');
    console.log({
      id: newAdmin.id,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      is_active: newAdmin.is_active,
    });

    await closePool();
    process.exit(0);
  } catch (error) {
    console.error('[ERROR] Failed to create admin:', error.message);
    await closePool();
    process.exit(1);
  }
};

run();
