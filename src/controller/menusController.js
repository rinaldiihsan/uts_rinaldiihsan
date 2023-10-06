const db = require('../../db/connection');

const getMenu = (req, res) => {
  const query = 'SELECT * FROM menu';

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.error('Gagal mengambil data menu:', err);
        return;
      } else {
        res.status(200).json({ menu: result });
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
        res.status(200).json({ MenuByID: result });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

const postMenu = (req, res) => {
  const { item, price } = req.body;
  const sql = 'INSERT INTO menu (item, price) VALUES (?, ?)';
  const values = [item, price];

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Gagal menambahkan menu:', err);
        res.status(500).json({ error: 'Gagal menambahkan menu' });
      } else {
        const data = {
          isSuccess: true,
          menu: {
            id: result.insertId,
            item,
            price,
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

const updateMenu = (req, res) => {
  const { id } = req.params;
  const { item, price } = req.body;
  const sql = 'UPDATE menu SET item = ?, price = ? WHERE id = ?';
  const values = [item, price, id];

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Gagal memperbarui menu:', err);
        res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui menu' });
      } else if (result.affectedRows > 0) {
        const data = {
          isSuccess: true,
          menu: {
            id,
            item,
            price,
            updated_at: new Date(),
          },
        };
        res.status(200).json({ message: 'Menu berhasil diperbarui', data });
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
        const data = {
          isSuccess: true,
          menu: {
            id,
          },
        };
        res.status(200).json({ message: 'Menu berhasil dihapus', data });
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
