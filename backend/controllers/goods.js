const fs = require('fs')
const os = require('os')
const path = require('path')

var Busboy = require('busboy')

let Goods = require('../models/goods_model')

// forming JSON body - utility function for JSON parsing
  function readyJSON(req) {
      return new Promise((resolve, reject) => {
          try {
              let body = ''
              // var form = new formidable.IncomingForm()

              req.on('data', (chunk) => {
                  body += chunk.toString()
              })

              req.on('end', () => {
                  resolve(body)
              })
          } catch (err) {
              reject(err)
          }
      })
  }
// end utility

// STANDARD CRUD CONTROLLERS

// 1 Gets all products
async function getProducts(req,res) {
  Goods.find()
    .then(goods => res.end(JSON.stringify(goods)))
    .catch(err => res.end(JSON.stringify(err)))
  }

// 2 Gets a product
async function getProduct(req,res,id) {
  Goods.findById(id)
  .then(goods => res.end(JSON.stringify(goods)))
  .catch(err => res.end(JSON.stringify(err)))
  }

// 3 Creates a product
async function createProduct(req,res) {
    // busboy form parsing
    var busboy = new Busboy({ headers: req.headers })
    let body = {}
    let filename_list = []
       busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
         const filename_server = `${filename.substr(0, filename.lastIndexOf("."))}_${Date.now()}_${path.extname(filename)}`
         var saveTo = path.resolve('./src/img/', filename_server)
         file.pipe(fs.createWriteStream(saveTo))
         filename_list.push(filename_server)
       })
       busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
         body[fieldname] = val
       })
       busboy.on('finish', function() {
         body['filename'] = filename_list
         let { param1, param2, param3, filename, date } = JSON.parse(JSON.stringify(body))
         const newGoods = new Goods({
           param1,
           param2,
           param3,
           filename,
           date
         })

         newGoods.save()
           .then(() => res.end('Done!'))
           .catch(err => res.end(JSON.stringify(err)))
        })
      return req.pipe(busboy)
  }

// 4 Updates a product
async function updateProduct(req, res, id) {
  // busboy form parsing
  var busboy = new Busboy({ headers: req.headers })
  let body = {}
  let filename_list = []
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        const filename_server = `${filename.substr(0, filename.lastIndexOf("."))}_${Date.now()}_${path.extname(filename)}`
        var saveTo = path.resolve('./src/img/', filename_server)
        file.pipe(fs.createWriteStream(saveTo))
        filename_list.push(filename_server)
      })
     busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
       body[fieldname] = val
     })
     busboy.on('finish', function() {
       if (filename_list.length>0) {
       body['filename'] = filename_list
     }
      let { param1, param2, param3, filename, date } = JSON.parse(JSON.stringify(body))

       Goods.findById(id)
         .then(goods => {
           goods.param1 = param1 || goods.param1
           goods.param2 = param2 || goods.param2
           goods.param3 = param3 || goods.param3
           goods.filename = filename || goods.filename
           goods.date = date || goods.date

           goods.save()
             .then(() => res.end(JSON.stringify('Goods updated!')))
             .catch(err => res.end(JSON.stringify(err)))
         })
         .catch(err => JSON.stringify(err))
      })
    return req.pipe(busboy)
}

// 5 Deletes a product
async function deleteProduct(req,res, id) {
  Goods.findByIdAndDelete(id)
    .then(() => res.end(JSON.stringify('Goods deleted!')))
    .catch(err => res.end(JSON.stringify(err)))
}

// ADDITIONAL SEARCH AND FILTER CONTROLLERS

// Searches for products and filters based on a parameter
async function searchProduct(req,res, searchparam, is_goodparam) {
  if (is_goodparam == 'true') {
    Goods.find({$and: [{$text: {$search: searchparam }}, {param3: true}]})
      .then(goods => res.end(JSON.stringify(goods)))
      .catch(err => res.end(JSON.stringify(err)))
  }
  else if (is_goodparam == 'false') {
    Goods.find({$and: [{$text: {$search: searchparam }}, {param3: false}]})
      .then(goods => res.end(JSON.stringify(goods)))
      .catch(err => res.end(JSON.stringify(err)))
  }
  else {
    Goods.find({$text: {$search: searchparam }})
      .then(goods => res.end(JSON.stringify(goods)))
      .catch(err => res.end(JSON.stringify(err)))
  }
    }

// Gets 20 latest products
async function getProductsLimit(req,res, limit) {
    Goods.find()
      .sort({'date': -1})
      .limit(Number(limit))
      .then(goods => res.end(JSON.stringify(goods)))
      .catch(err => res.end(JSON.stringify(err)))
    }

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  getProductsLimit
}
