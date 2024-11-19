const express = require('express');
const router = express.Router();
// CONTROLLERS
const {authenticate, authorizeAdmin} = require('../middleware/authMiddleware');
const createCategory = require('../controller/category/createCategory');
const updateCategory = require('../controller/category/updateCategory');
const removeCategory = require('../controller/category/removeCategory');
const categoryList = require('../controller/category/categoryList');
const getCurrentCategory = require('../controller/category/getCurrentCategory');

router.post('/create-category', createCategory, authenticate, authorizeAdmin);
router.put('/update-category/:categoryId', authenticate, authorizeAdmin, updateCategory);
router.delete('/delete-category/:categoryId', authenticate, authorizeAdmin, removeCategory);
router.get('/all-categories', categoryList);
router.get('/get-category/:categoryId', getCurrentCategory);
module.exports = router