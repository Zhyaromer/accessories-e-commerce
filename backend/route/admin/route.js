const express = require('express');
const router = express.Router();
const login = require('../../contoller/admin/login.js');
const checkAuth = require('../../contoller/admin/checkauth.js');
const getAllProducts = require('../../contoller/admin/getAllProducts.js');
const deleteProduct = require('../../contoller/admin/deleteProduct.js');
const addProduct = require('../../contoller/admin/addProduct.js');

router.post('/login', login);
router.get('/checkauth', checkAuth);
router.get('/getAllProducts', getAllProducts);

router.post('/addProduct', addProduct);

router.delete('/deleteProduct/:id', deleteProduct);


module.exports = router;