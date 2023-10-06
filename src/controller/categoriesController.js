const db = require('../../db/connection');

const getCategories = (req, res) => {
  const query = 'SELECT * FROM categories';

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.error('Gagal mengambil data categories:', err);
        return;
      } else {
        res.status(200).json({ categories: result });
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
        res.status(200).json({ categoriesByID: result });
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

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Gagal menambahkan categories:', err);
        res.status(500).json({ error: 'Gagal menambahkan categories' });
      } else {
        const data = {
          isSuccess: true,
          categories: {
            id: result.insertId,
            name,
            created_at: new Date(),
            updated_at: new Date(),
          },
        };
        res.status(201).json({ message: data });
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

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Gagal memperbarui categories:', err);
        res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui categories' });
      } else if (result.affectedRows > 0) {
        const data = {
          isSuccess: true,
          categories: {
            id,
            name,
            updated_at: new Date(),
          },
        };
        res.status(200).json({ message: 'categories berhasil diperbarui', data });
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
        const data = {
          isSuccess: true,
          categories: {
            id,
          },
        };
        res.status(200).json({ message: 'categories berhasil dihapus', data });
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
