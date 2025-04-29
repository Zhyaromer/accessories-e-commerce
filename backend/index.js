const express = require('express')
const app = express()
const port = 4000
require('dotenv').config();
const path = require('path');
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

app.use(cors({ 
    origin: process.env.NODE_ENV === 'production' 
    ? 'https://bejewelled-monstera-2438ab.netlify.app' 
    : 'http://localhost:5173',
    credentials: true 
}));

app.use('/products', products)
app.use('/admin', admin)

if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, '../frontend/dist');

    app.use(express.static(distPath));

    app.get(/^(?!\/api).*/, (req, res) => { 
        res.sendFile(path.join(distPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => res.send('Hello World!'));
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`))