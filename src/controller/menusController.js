const db = require('../../db/connection');

const getMenu = (req, res) => {
  const query = 'SELECT * FROM menu';

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.error('Gagal mengambil data menu:', err);
        return;
      } else {
        const responseData = result.length > 0 ? result : {};
        res.status(200).json({ status: 'OK', data: responseData });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

const getMenuById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM menu WHERE id= ?';

  try {
    db.query(sql, id, (err, result) => {
      if (err) {
        console.error('Gagal mengambil data menu:', err);
        return;
      } else {
        const responseData = result.length > 0 ? result : {};
        res.status(200).json({ status: 'OK', data: responseData });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

const postMenu = (req, res) => {
  const { item, price } = req.body;

  if (!item || !/^[a-zA-Z\s]+$/.test(item)) {
    return res.status(400).json({ error: 'Item harus diisi dan hanya boleh berisi huruf' });
  }

  if (!price || isNaN(price)) {
    return res.status(400).json({ error: 'Price harus diisi dan hanya boleh berisi angka' });
  }

  const sql = 'INSERT INTO menu (item, price) VALUES (?, ?)';
  const values = [item, price];

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Gagal menambahkan menu:', err);
        res.status(500).json({ error: 'Gagal menambahkan menu' });
      } else {
        res.status(201).json({ status: 'OK', message: 'Data berhasil ditambahkan' });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

const updateMenu = (req, res) => {
  const { id } = req.params;
  const { item, price } = req.body;

  if (!item || !/^[a-zA-Z\s]+$/.test(item)) {
    return res.status(400).json({ error: 'Item harus diisi dan hanya boleh berisi huruf' });
  }

  if (!price || isNaN(price)) {
    return res.status(400).json({ error: 'Price harus diisi dan hanya boleh berisi angka' });
  }

  const sql = 'UPDATE menu SET item = ?, price = ? WHERE id = ?';
  const values = [item, price, id];

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Gagal memperbarui menu:', err);
        res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui menu' });
      } else if (result.affectedRows > 0) {
        res.status(200).json({ status: 'OK', message: 'Data berhasil diperbarui' });
      } else {
        res.status(404).json({ error: 'Menu tidak ditemukan' });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

const deleteMenu = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM menu WHERE id = ?';

  try {
    db.query(sql, id, (err, result) => {
      if (err) {
        console.error('Gagal menghapus menu:', err);
        res.status(500).json({ error: 'Terjadi kesalahan saat menghapus menu' });
      } else if (result.affectedRows > 0) {
        res.status(200).json({ status: 'OK', message: 'Data berhasil dihapus' });
      } else {
        res.status(404).json({ error: 'Menu tidak ditemukan' });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

module.exports = {
  getMenu,
  getMenuById,
  postMenu,
  updateMenu,
  deleteMenu,
};
