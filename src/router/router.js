const express = require('express');
const router = express.Router();

const { getMenu, getMenuById, postMenu, updateMenu, deleteMenu } = require('../controller/menusController');
const { getCust, getCustById, postCust, updateCust, deleteCust } = require('../controller/custController');
const { getCategories, getCategoriesById, postCategories, updateCategories, deleteCategories } = require('../controller/categoriesController');
const { postOrder } = require('../controller/ordersController');
const { getAllHistory } = require('../controller/historyController');

// Menu
router.get('/menu', getMenu);
router.get('/menu/:id', getMenuById);
router.post('/menu', postMenu);
router.put('/menu/:id', updateMenu);
router.delete('/menu/:id', deleteMenu);
// Akhir Routes Menu

// Customer
router.get('/customer', getCust);
router.get('/customer/:id', getCustById);
router.post('/customer', postCust);
router.put('/customer/:id', updateCust);
router.delete('/customer/:id', deleteCust);
// Akhir Routes Customer

// Categories
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoriesById);
router.post('/categories', postCategories);
router.put('/categories/:id', updateCategories);
router.delete('/categories/:id', deleteCategories);
// Akhir Routes Categories

// Orders
router.post('/orders', postOrder);
// Akhir Routes Orders

// History
router.get('/history', getAllHistory);
// Akhir Routes History

module.exports = router;
