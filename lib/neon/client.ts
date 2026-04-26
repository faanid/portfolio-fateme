import { Pool } from '@neondatabase/serverless';

/**
 * Neon client - PostgreSQL serverless database
 * Uses environment variable: DATABASE_URL (provided by Neon integration)
 */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = pool;

/**
 * Example usage:
 * const result = await db.query('SELECT * FROM projects');
 * const project = await db.query('SELECT * FROM projects WHERE id = $1', [id]);
 */
