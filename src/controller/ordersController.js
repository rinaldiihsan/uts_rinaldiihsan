const { orderModel } = require('../models/orderModel');

const postOrder = async (req, res) => {
  try {
    const { customerId, items } = req.body;

    if (typeof customerId !== 'number' || customerId <= 0 || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Permintaan tidak valid' });
    }

    const orderData = {
      status: 'OK',
      message: 'Data Berhasil Ditambahkan!',
      orders: [],
      totalOrder: 0,
      orderDate: new Date().toISOString().split('T')[0],
    };

    const processOrderItem = (item, callback) => {
      const { menuId, qty } = item;

      orderModel.addOrder(customerId, menuId, qty, (err, result) => {
        if (err) {
          return callback(err, null);
        }

        const orderId = result.insertId;
        const order = { menuId, qty };

        orderData.orders.push(order);

        orderModel.getMenuPrice(menuId, (menuErr, price) => {
          if (menuErr) {
            return callback(menuErr, null);
          }

          orderData.totalOrder += price * qty;

          if (orderData.orders.length === items.length) {
            callback(null, orderData);
          }
        });
      });
    };

    const processItems = (index) => {
      if (index < items.length) {
        processOrderItem(items[index], (err, data) => {
          if (err) {
            return res.status(500).json({ error: 'Gagal menambahkan pesanan' });
          }

          if (index === items.length - 1) {
            res.status(201).json(data);
          } else {
            processItems(index + 1);
          }
        });
      }
    };

    processItems(0);
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambahkan pesanan' });
  }
};

module.exports = { postOrder };
