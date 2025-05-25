const mysql = require("mysql2/promise");
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database:  process.env.DATABASE,
});

module.exports = db;
