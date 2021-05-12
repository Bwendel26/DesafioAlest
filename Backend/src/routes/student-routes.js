const express = require('express');
const { addProduct } = require('../controllers/productController');

const router = express.Router();

router.post('/product', addProduct);

module.exports = {
    routes:router
}