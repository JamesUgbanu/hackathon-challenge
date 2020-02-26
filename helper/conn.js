import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();
const connection = () => {
  const client = new Client(process.env.DATABASE_URL);
  return client;
};

export default connection;
