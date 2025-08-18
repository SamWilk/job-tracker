import pkg from "pg";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const { Pool } = pkg;

let sslConfig = false;

if (process.env.PGSSL === "true") {
  sslConfig = {
    rejectUnauthorized: false, // Set false if you don’t want cert validation
  };

  if (process.env.PGSSL_CA) {
    sslConfig.ca = fs.readFileSync(process.env.PGSSL_CA).toString();
  }
}

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  max: 10,
  idleTimeoutMillis: 30000,
  ssl: sslConfig,
});

pool.on("error", (err) => {
  console.error("Unexpected PG Pool Error:", err);
  process.exit(-1);
});

export default pool;
