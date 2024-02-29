import { Client } from "pg";

export const client = new Client({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
});

export default client
