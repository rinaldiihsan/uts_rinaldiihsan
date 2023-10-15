const mysql = require('mysql2/promise');
require('dotenv').config();

// Membuat pool koneksi dengan promise
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restaurantdb',
});

module.exports = pool;
