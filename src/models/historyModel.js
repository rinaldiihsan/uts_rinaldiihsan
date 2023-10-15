const pool = require('../../db/poolCon');

// Fungsi untuk mendapatkan semua data histori
const getAllHistoryData = async () => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(`
      SELECT
        c.name AS customerName,
        o.order_date AS orderDate,
        m.item AS menu, 
        m.price AS price, 
        o.qty AS qty
      FROM orders o
      JOIN customer c ON o.customer_id = c.id
      JOIN menu m ON o.menu_id = m.id
    `);

    const historyData = rows.map((row) => {
      return {
        customerName: row.customerName,
        orderDate: row.orderDate.toISOString().split('T')[0], // Ubah format tanggal
        menu: row.menu,
        price: row.price,
        qty: row.qty,
      };
    });

    return historyData;
  } catch (error) {
    throw error;
  } finally {
    connection.release(); // Selalu pastikan untuk melepaskan koneksi setelah digunakan
  }
};

module.exports = {
  getAllHistoryData,
};
