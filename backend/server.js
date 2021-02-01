// require modules
const http = require('http')
const path = require('path')

const mongoose = require('mongoose')

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, searchProduct, getProductsLimit } = require('./controllers/goods')
const { getUser, getUsers, createUser, loginUser, logoutUser } = require('./controllers/users')

require('dotenv').config()

const domain = process.env.DOMAIN

// Product database connection
const uri = process.env.ATLAS_URI
mongoose.connect(`${uri}`, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const productConnection = mongoose.connection
productConnection.once('open', () => {
  console.log('MongoDB Atlas connection established')
})

// server routes
const server = http.createServer((req, res) => {
    // PRODUCTS API, MongoDB Atlas //
    // STANDARD CRUD ROUTES
    if(req.url === '/api/products' && req.method === 'GET') {
        res.writeHead(200, {'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'})
        getProducts(req, res)
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'GET') {
        res.writeHead(200, {'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'})
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    } else if(req.url === '/api/products' && req.method === 'POST') {
        res.writeHead(200, {'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'})
        createProduct(req, res)
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT') {
        res.writeHead(200, {'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'})
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') {
        res.writeHead(200, {'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'})
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    }
    // OPTIONS request for preflight
    else if(req.url.match(/.+/) && req.method === 'OPTIONS') {
        res.writeHead(200, {'Access-Control-Allow-Origin': `${domain}`,
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true'})
        res.end()
    }
    // ADDITIONAL SEARCH AND FILTER ROUTES
    else if(req.url.match(/\/api\/products_search\/.+\/is_good\=\w+/) && req.method === 'GET') {
      res.writeHead(200, {'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'})
      const searchparam = req.url.split('/')[3].replace('%20', ' ')
      const is_goodparam = req.url.split('/')[4].slice(8).replace('%20', ' ') || 'null'
      searchProduct(req, res, searchparam, is_goodparam)
    }
    else if(req.url.match(/\/api\/products_search\/limit\=\w+/) && req.method === 'GET') {
      res.writeHead(200, {'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'})
      const limit = req.url.split('/')[3].slice(6) || 20
      getProductsLimit(req, res, limit)
    }

    // USERS API, JSON file //
    // Get all users
    else if(req.url == '/api/users' && req.method === 'GET') {
      res.writeHead(200, {'Access-Control-Allow-Origin': `${domain}`,
      'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'})
      getUsers(req, res)
    }

    // Get a user, check a client cookie against stored cookie
    else if(req.url.match(/\/api\/users\/.+/) && req.method === 'GET') {
      res.writeHead(200, {'Access-Control-Allow-Origin': `${domain}`,
      'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true'})
      const username = req.url.split('/')[3]
      getUser(req, res, username)
    }

    // Create a user
    else if(req.url == '/api/users' && req.method === 'POST') {
      res.writeHead(200, {'Access-Control-Allow-Origin': `${domain}`,
      'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'})
      createUser(req, res)
    }

    // Login, store cookie and return a session cookie to client
    else if(req.url.match('/api/users') && req.method === 'PUT') {
      loginUser(req, res)
    }

    // Logout, delete session cookie
    else if(req.url.match('/api/users') && req.method === 'DELETE') {
      logoutUser(req, res)
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
