const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Zhyarking2004@@",
  database: "dazhir",
});

module.exports = db;
