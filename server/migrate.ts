import 'dotenv/config';
import { pool } from './db';
import fs from 'fs';
import path from 'path';

async function migrate() {
  try {
    const migrationSQL = fs.readFileSync(path.join(process.cwd(), 'drizzle', '0000_initial.sql'), 'utf8');
    await pool.query(migrationSQL);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error running migration:', error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

migrate(); 