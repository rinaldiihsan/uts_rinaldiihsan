const mysql = require('mysql2');
require('dotenv').config();

// Koneksi
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restaurantdb',
});

module.exports = db;
