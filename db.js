import pg from 'pg';
import dotEnv from 'dotenv';

dotEnv.config();

const connection = new pg.Client({
  user: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DATABASE
});

await connection.connect();

export default connection;