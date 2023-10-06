const db = require('../../db/connection');

const getCust = (req, res) => {
  const query = 'SELECT * FROM customer';

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.error('Gagal mengambil data customer:', err);
        return;
      } else {
        res.status(200).json({ customer: result });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

const getCustById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM customer WHERE id= ?';

  try {
    db.query(sql, id, (err, result) => {
      if (err) {
        console.error('Gagal mengambil data customer:', err);
        return;
      } else {
        res.status(200).json({ customerByID: result });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};

const postCust = (req, res) => {
  const { name, address, email } = req.body;
  const sql = 'INSERT INTO customer (name, address, email) VALUES (?, ?, ?)';
  const values = [name, address, email];

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Gagal menambahkan customer:', err);
        res.status(500).json({ error: 'Gagal menambahkan customer' });
      } else {
        const data = {
          isSuccess: true,
          customer: {
            id: result.insertId,
            name,
            address,
            email,
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

const updateCust = (req, res) => {
  const { id } = req.params;
  const { name, address, email } = req.body;
  const sql = 'UPDATE customer SET name = ?, address = ?, email = ? WHERE id = ?';
  const values = [name, address, email, id];

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Gagal memperbarui customer:', err);
        res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui customer' });
      } else if (result.affectedRows > 0) {
        const data = {
          isSuccess: true,
          customer: {
            id,
            name,
            address,
            email,
            updated_at: new Date(),
          },
        };
        res.status(200).json({ message: 'customer berhasil diperbarui', data });
      } else {
        res.status(404).json({ error: 'customer tidak ditemukan' });
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
        const data = {
          isSuccess: true,
          customer: {
            id,
          },
        };
        res.status(200).json({ message: 'customer berhasil dihapus', data });
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
