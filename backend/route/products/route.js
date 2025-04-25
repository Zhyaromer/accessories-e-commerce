const express = require('express');
const router = express.Router();
const getNewestProducts = require('../../contoller/products/getNewestProducts');
const getAllProducts = require('../../contoller/products/getall.js');
const getProductById = require('../../contoller/products/getProductById.js');

router.get('/newest', getNewestProducts);
router.get('/getall', getAllProducts);
router.get('/getbyid/:id', getProductById);

module.exports = router;