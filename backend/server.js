// require modules
const http = require('http')
const mongoose = require('mongoose')
const path = require('path')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, searchProduct } = require('./controllers/goods')

require('dotenv').config()

// database connection
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB Atlas connection established')
})

// server routes
const server = http.createServer((req, res) => {
    // STANDARD CRUD ROUTES
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
    }
    // ADDITIONAL SEARCH AND FILTER ROUTES
    else if(req.url.match(/\/api\/products_search\/.+\/is_good\=\w+/) && req.method === 'GET') {
        const searchparam = req.url.split('/')[3].replace('%20', ' ')
        const is_goodparam = req.url.split('/')[4].slice(8).replace('%20', ' ') || 'null'
        searchProduct(req, res, searchparam, is_goodparam)
    }
    // ERROR HANDLE
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
})

// port
const port = process.env.port || 5000

// start
server.listen(port, () => console.log (`Server running on port ${port}`))
