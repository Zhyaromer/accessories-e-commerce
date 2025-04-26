const express = require('express');
const router = express.Router();
const login = require('../../contoller/admin/login.js');
const checkAuth = require('../../contoller/admin/checkauth.js');

router.post('/login', login);
router.get('/checkauth', checkAuth);

module.exports = router;