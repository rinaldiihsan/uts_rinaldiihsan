const mysql = require('mysql2');

// Membuat koneksi ke server MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

// Membuat database
const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS restaurantdb';
connection.query(createDatabaseQuery, (err) => {
  if (err) {
    console.error('Gagal membuat database:', err);
    connection.end();
  } else {
    console.log('Database berhasil dibuat atau sudah ada.');

    // Menggunakan database yang sudah ada atau baru saja dibuat
    connection.changeUser({ database: 'restaurantdb' }, (err) => {
      if (err) {
        console.error('Gagal mengganti database:', err);
        connection.end();
        return;
      }

      // Membuat tabel menu
      const createTableMenu = `CREATE TABLE IF NOT EXISTS menu (
        id INT(11) PRIMARY KEY AUTO_INCREMENT,
        item VARCHAR(50) NOT NULL,
        price INT(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`;

      connection.query(createTableMenu, (err) => {
        if (err) {
          console.error('Gagal membuat tabel menu:', err);
        } else {
          console.log('Tabel menu berhasil dibuat atau sudah ada.');
        }

        // Membuat tabel customer
        const createTableCustomer = `CREATE TABLE IF NOT EXISTS customer (
          id INT(11) PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(50) NOT NULL,
          address VARCHAR(50) NOT NULL,
          email VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;

        connection.query(createTableCustomer, (err) => {
          if (err) {
            console.error('Gagal membuat tabel customer:', err);
          } else {
            console.log('Tabel customer berhasil dibuat atau sudah ada.');
          }

          // Membuat tabel categories
          const createTableCategories = `CREATE TABLE IF NOT EXISTS categories (
            id INT(11) PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )`;

          connection.query(createTableCategories, (err) => {
            if (err) {
              console.error('Gagal membuat tabel categories:', err);
            } else {
              console.log('Tabel categories berhasil dibuat atau sudah ada.');
            }

            const createTableOrders = `CREATE TABLE IF NOT EXISTS orders (
              id INT(11) PRIMARY KEY AUTO_INCREMENT,
              customer_id INT(11) NOT NULL,
              menu_id INT(11) NOT NULL,
              qty INT(11) NOT NULL,
              order_date DATE NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              FOREIGN KEY (customer_id) REFERENCES customer(id),
              FOREIGN KEY (menu_id) REFERENCES menu(id)
            )`;

            connection.query(createTableOrders, (err) => {
              if (err) {
                console.error('Gagal membuat tabel orders:', err);
              } else {
                console.log('Tabel orders berhasil dibuat atau sudah ada.');
              }

              connection.end();
            });
          });
        });
      });
    });
  }
});
