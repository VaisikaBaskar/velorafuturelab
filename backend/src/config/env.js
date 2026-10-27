const path = require('path');
const dotenv = require('dotenv');
const { z } = require('zod');

// Load environment variables from backend/.env or root .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),

  // Database settings
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_NAME: z.string().default('velora_futurelab'),
  DB_USER: z.string().default('postgres'),
  DB_PASSWORD: z.string().optional(),
  DATABASE_URL: z.string().optional(),

  // JWT configuration
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters long'),
  JWT_EXPIRES_IN: z.string().default('1d'),
});

let parsedEnv;
try {
  parsedEnv = envSchema.parse(process.env);

  // Validate that either DATABASE_URL or DB_PASSWORD is provided
  if (!parsedEnv.DATABASE_URL && !parsedEnv.DB_PASSWORD) {
    throw new Error('Database connection credentials missing: provide either DATABASE_URL or DB_PASSWORD in environment.');
  }
} catch (error) {
  if (error instanceof z.ZodError) {
    const missingKeys = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
    console.error(`[FATAL] Environment configuration error: ${missingKeys}`);
  } else {
    console.error(`[FATAL] Environment configuration error: ${error.message}`);
  }
  process.exit(1);
}

module.exports = {
  NODE_ENV: parsedEnv.NODE_ENV,
  PORT: parsedEnv.PORT,
  DB_HOST: parsedEnv.DB_HOST,
  DB_PORT: parsedEnv.DB_PORT,
  DB_NAME: parsedEnv.DB_NAME,
  DB_USER: parsedEnv.DB_USER,
  DB_PASSWORD: parsedEnv.DB_PASSWORD,
  DATABASE_URL: parsedEnv.DATABASE_URL,
  JWT_SECRET: parsedEnv.JWT_SECRET,
  JWT_EXPIRES_IN: parsedEnv.JWT_EXPIRES_IN,
  isProduction: parsedEnv.NODE_ENV === 'production',
};
