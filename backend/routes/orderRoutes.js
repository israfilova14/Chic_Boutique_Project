const express = require('express');
const router = express.Router();
const {authenticate, authorizeAdmin} = require('../middleware/authMiddleware.js')
const createOrder = require('../controller/order/createOrder.js');
const getAllOrders = require('../controller/order/getAllOrders.js');
const getUserOrders = require('../controller/order/getUserOrders.js');
const countTotalOrders = require('../controller/order/countTotalOrders.js');
const calculateTotalSales = require('../controller/order/calculateTotalSales.js');
const calculateTotalSalesByDate = require('../controller/order/calculateTotalSalesByDate.js');
const findOrderById = require('../controller/order/findOrderById.js');
const markOrderAsPaid = require('../controller/order/markOrderAsPaid.js');
const markOrderAsDelivered = require('../controller/order/markOrderAsDelivered.js');

router.post('/create-order', authenticate, createOrder);
router.get('/all-orders', authenticate, authorizeAdmin, getAllOrders);
router.get('/user-orders', authenticate, getUserOrders);
router.get('/total-orders', countTotalOrders);
router.get('/total-sales', calculateTotalSales);
router.get('/total-sales-by-date', calculateTotalSalesByDate);
router.get('/find-order/:id', authenticate, findOrderById);
router.put('/order-paid/:id', authenticate, markOrderAsPaid);
router.put('/deliver/:id', authenticate, authorizeAdmin, markOrderAsDelivered)

module.exports = router