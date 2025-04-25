const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const products = require('./route/products/route.js')

app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/products', products)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))