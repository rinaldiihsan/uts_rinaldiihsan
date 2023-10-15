const db = require('../../db/connection');

const getCategories = (req, res) => {
  const query = 'SELECT * FROM categories';

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.error('Gagal mengambil data categories:', err);
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

const getCategoriesById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM categories WHERE id= ?';

  try {
    db.query(sql, id, (err, result) => {
      if (err) {
        console.error('Gagal mengambil data categories:', err);
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

const postCategories = (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO categories (name) VALUES (?)';
  const values = [name];

  if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
    return res.status(400).json({ error: 'nama harus diisi dan hanya boleh berisi huruf' });
  }

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Gagal menambahkan categories:', err);
        res.status(500).json({ error: 'Gagal menambahkan categories' });
      } else {
        res.status(201).json({ status: 'OK', message: 'Data berhasil ditambahkan' });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

const updateCategories = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const sql = 'UPDATE categories SET name = ? WHERE id = ?';
  const values = [name, id];

  if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
    return res.status(400).json({ error: 'nama harus diisi dan hanya boleh berisi huruf' });
  }

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Gagal memperbarui categories:', err);
        res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui categories' });
      } else if (result.affectedRows > 0) {
        res.status(200).json({ status: 'OK', message: 'Data berhasil diperbarui' });
      } else {
        res.status(404).json({ error: 'categories tidak ditemukan' });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

const deleteCategories = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM categories WHERE id = ?';

  try {
    db.query(sql, id, (err, result) => {
      if (err) {
        console.error('Gagal menghapus categories:', err);
        res.status(500).json({ error: 'Gagal menghapus categories' });
      } else if (result.affectedRows > 0) {
        res.status(200).json({ status: 'OK', message: 'Data berhasil dihapus' });
      } else {
        res.status(404).json({ error: 'categories tidak ditemukan' });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

module.exports = {
  getCategories,
  getCategoriesById,
  postCategories,
  updateCategories,
  deleteCategories,
};
