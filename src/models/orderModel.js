const db = require('../../db/connection');

const orderModel = {
  addOrder: (customerId, menuId, qty, callback) => {
    const sql = 'INSERT INTO orders (customer_id, menu_id, qty, order_date) VALUES (?, ?, ?, NOW())';
    const values = [customerId, menuId, qty];

    db.query(sql, values, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  },

  getMenuPrice: (menuId, callback) => {
    const sql = 'SELECT price FROM menu WHERE id = ?';
    const values = [menuId];

    db.query(sql, values, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      if (result.length === 0) {
        return callback({ message: 'Menu not found' }, null);
      }
      callback(null, result[0].price);
    });
  },

  getAllOrders: (callback) => {
    const sql = `
      SELECT
        o.id AS order_id,
        o.qty AS qty,
        o.order_date AS order_date,
        c.id AS customer_id,
        c.name AS customer_name,
        m.id AS menu_id,
        m.item AS menu_item,
        m.price AS price
      FROM
        orders o
      JOIN
        customer c ON o.customer_id = c.id
      JOIN
        menu m ON o.menu_id = m.id;
    `;

    db.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
};

module.exports = orderModel;
