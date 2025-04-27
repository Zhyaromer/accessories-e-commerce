const express = require('express');
const router = express.Router();
const getNewestProducts = require('../../contoller/products/getNewestProducts');
const getAllProducts = require('../../contoller/products/getall.js');
const getProductById = require('../../contoller/products/getProductById.js');
const getOtherColors = require('../../contoller/products/getOtherColors.js');
const getSimilarProducts = require('../../contoller/products/similiarProducts.js');
const getCheckoutProducts = require('../../contoller/products/getcheckout.js');

router.get('/newest', getNewestProducts);
router.get('/getall', getAllProducts);
router.get('/getbyid/:id', getProductById);
router.get('/getothercolors/:id', getOtherColors);
router.get('/getsimilarproducts/:id', getSimilarProducts);
router.get('/getcheckout', getCheckoutProducts);

module.exports = router;