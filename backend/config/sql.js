const mysql = require("mysql2/promise");
require('dotenv').config();

async function testConnection() {
  try {
    const db = mysql.createPool({
      host: process.env.HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
    });

    // Try a simple query
    const [rows] = await db.query("SELECT count(*) AS result FROM products");
    console.log("DB connected! Test query result:", rows[0].result);

    await db.end(); // close pool
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
}

testConnection();
