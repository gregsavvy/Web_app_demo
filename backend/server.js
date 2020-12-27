// require modules
const http = require('http')
const mongoose = require('mongoose')
const path = require('path')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controllers/goods')

require('dotenv').config()

// database connection
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB Atlas connection established')
});

// server routes
const server = http.createServer((req, res) => {
    if(req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res)
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    } else if(req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
})

// port
const port = process.env.port || 5000

// start
server.listen(port, () => console.log (`Server running on port ${port}`))
