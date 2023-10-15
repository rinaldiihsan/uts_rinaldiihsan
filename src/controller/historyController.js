const historyModel = require('../models/historyModel');

// Fungsi untuk mengambil semua data histori dan menangani permintaan HTTP dengan async/await
async function getAllHistory(req, res) {
  try {
    const historyData = await historyModel.getAllHistoryData();

    const customers = {};

    for (const row of historyData) {
      if (!customers[row.customerName]) {
        customers[row.customerName] = {
          customerName: row.customerName,
          orders: [],
          totalOrder: 0,
          orderDate: row.orderDate,
        };
      }

      customers[row.customerName].orders.push({
        menu: row.menu,
        price: row.price,
        qty: row.qty,
      });

      customers[row.customerName].totalOrder += row.price * row.qty;
    }

    const formattedResponse = {
      status: 'OK',
      data: Object.values(customers),
    };

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
  }
}

module.exports = {
  getAllHistory,
};
