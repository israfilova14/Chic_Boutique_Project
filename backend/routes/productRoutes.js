const express = require('express');
const formidable = require('express-formidable');
const router = express.Router();

//CONTROLLERS
const checkId = require('../middleware/checkId.js');
const addProduct = require('../controller/product/addProduct.js');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware.js');
const updateProductDetails = require('../controller/product/updateProduct.js');
const deleteProduct = require('../controller/product/deleteProduct.js');
const getProducts = require('../controller/product/getProducts.js');
const getProductById = require('../controller/product/getProductById.js');
const getAllProducts = require('../controller/product/getAllProducts.js');
const addProductReview = require('../controller/product/addProductReview.js');
const getTopProducts = require('../controller/product/getTopProducts.js');
const getNewProduct = require('../controller/product/getNewProduct.js');
const filterProducts = require('../controller/product/filterProducts.js');

router.post('/add-product', authenticate, authorizeAdmin,  addProduct);
router.put('/update-product/:id', authenticate, authorizeAdmin, formidable(), updateProductDetails);
router.delete('/delete-product/:id', authenticate, authorizeAdmin, deleteProduct);
router.get("/get-products", getProducts);
router.get("/get-product/:id", getProductById);
router.get("/all-products", getAllProducts);
router.post("/reviews/:id", authenticate, addProductReview, checkId);
router.get("/top-products", getTopProducts);
router.get("/new-product", getNewProduct);
router.post("/filter-products", filterProducts)
module.exports = router