const express = require('express')
const app = express()
const port = 4000
require('dotenv').config()
const cors = require('cors');
const products = require('./route/products/route.js')
const admin = require('./route/admin/route.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET,  
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,  
        maxAge: 1000 * 60 
    }
}));

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/products', products)
app.use('/admin', admin)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))