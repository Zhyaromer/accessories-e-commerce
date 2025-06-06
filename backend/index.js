const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const products = require('./route/products/route.js');
const admin = require('./route/admin/route.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    'http://localhost:5173',
    'https://bejewelled-monstera-2438ab.netlify.app',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

const sessionStore = new MySQLStore({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
});

app.use(session({
    key: 'session_id',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
}));

app.use('/products', products);
app.use('/admin', admin);

if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(distPath));

    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => res.send('Hello World!'));
}

app.listen(port, () => console.log(`Server listening on port ${port}!`));