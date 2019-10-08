/* eslint-disable import/no-mutable-exports */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;

if (process.env.NODE_ENV === 'isTesting') {
  pool = new Pool({
    connectionString: process.env.TESTING
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
}

export default pool;
