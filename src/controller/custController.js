const db = require('../../db/connection');

const getCust = (req, res) => {
  const query = 'SELECT * FROM customer';

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.error('Gagal mengambil data customer:', err);
        res.status(500).json({ status: 'Error', data: err.message });
      } else {
        const responseData = result.length > 0 ? result : {};
        res.status(200).json({ status: 'OK', data: responseData });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ status: 'Error', data: 'Terjadi kesalahan' });
  }
};

const getCustById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM customer WHERE id = ?';

  try {
    db.query(sql, id, (err, result) => {
      if (err) {
        console.error('Gagal mengambil data customer:', err);
        res.status(500).json({ status: 'Error', data: err.message });
      } else {
        const responseData = result.length > 0 ? result : {};
        res.status(200).json({ status: 'OK', data: responseData });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ status: 'Error', data: 'Terjadi kesalahan' });
  }
};

const postCust = (req, res) => {
  const { name, address, email } = req.body;

  if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
    return res.status(400).json({ error: 'Name harus diisi dan hanya boleh berisi huruf' });
  }

  if (!email || !/^[a-zA-Z]+$/.test(email)) {
    return res.status(400).json({ error: 'Email harus diisi dan hanya boleh berisi huruf' });
  }

  const sql = 'INSERT INTO customer (name, address, email) VALUES (?, ?, ?)';
  const values = [name, address, email];

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Gagal menambahkan customer:', err);
        res.status(500).json({ error: 'Gagal menambahkan customer' });
      } else {
        res.status(201).json({ status: 'OK', message: 'Data berhasil ditambahkan' });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

const updateCust = (req, res) => {
  const { id } = req.params;
  const { name, address, email } = req.body;

  if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
    return res.status(400).json({ error: 'Name harus diisi dan hanya boleh berisi huruf' });
  }

  if (!email || !/^[a-zA-Z]+$/.test(email)) {
    return res.status(400).json({ error: 'Email harus diisi dan hanya boleh berisi huruf' });
  }

  const sql = 'UPDATE customer SET name = ?, address = ?, email = ? WHERE id = ?';
  const values = [name, address, email, id];

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Gagal memperbarui customer:', err);
        res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui customer' });
      } else if (result.affectedRows > 0) {
        res.status(200).json({ status: 'OK', message: 'Data berhasil diperbarui' });
      } else {
        res.status(404).json({ error: 'Customer tidak ditemukan' });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

const deleteCust = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM customer WHERE id = ?';

  try {
    db.query(sql, id, (err, result) => {
      if (err) {
        console.error('Gagal menghapus customer:', err);
        res.status(500).json({ error: 'Gagal menghapus customer' });
      } else if (result.affectedRows > 0) {
        res.status(200).json({ status: 'OK', message: 'Data berhasil dihapus' });
      } else {
        res.status(404).json({ error: 'customer tidak ditemukan' });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

module.exports = {
  getCust,
  getCustById,
  postCust,
  updateCust,
  deleteCust,
};
