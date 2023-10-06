const db = require('./connection');

db.connect((err) => {
  if (err) {
    console.log('Koneksi gagal!');
    return;
  }
  console.log('Koneksi berhasil!');

  // Membuat tabel

  const createTableMenu = `CREATE TABLE IF NOT EXISTS menu (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    item VARCHAR(50) NOT NULL,
    price INT(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`;

  const createTableCustomer = `CREATE TABLE IF NOT EXISTS customer (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`;

  const createTableCategories = `CREATE TABLE IF NOT EXISTS categories (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`;

  db.query(createTableMenu, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Tabel menu berhasil dibuat!');
  });

  db.query(createTableCustomer, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Tabel customer berhasil dibuat!');
  });

  db.query(createTableCategories, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Tabel categories berhasil dibuat!');
  });

  db.end();
});
