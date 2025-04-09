const express = require('express');
const router = express.Router();
const getNewestProducts = require('../../contoller/products/getNewestProducts');
const getAllProducts = require('../../contoller/products/getall.js');

router.get('/newest', getNewestProducts);
router.get('/getall', getAllProducts);

module.exports = router;