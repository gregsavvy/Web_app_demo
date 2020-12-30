const fs = require('fs')
const os = require('os')
const path = require('path')

var Busboy = require('busboy')

let Goods = require('../models/goods_model')

// forming JSON body - utility function for create and update API
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

// CRUD CONTROLLERS

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

    var busboy = new Busboy({ headers: req.headers })
    let body = {}
       busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
         var saveTo = path.resolve('../', './backend/src/img/', path.basename(filename))
         file.pipe(fs.createWriteStream(saveTo))
         body['filename'] = filename
       })
       busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
         body[fieldname] = val

       })
       busboy.on('finish', function() {
         const { param1, param2, filename, date } = JSON.parse(JSON.stringify(body))
         const newGoods = new Goods({
           param1,
           param2,
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

  var busboy = new Busboy({ headers: req.headers })
  let body = {}
     busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
       var saveTo = path.resolve('../', './backend/src/img/', path.basename(filename))
       file.pipe(fs.createWriteStream(saveTo))
       body['filename'] = filename
     })
     busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
       body[fieldname] = val
     })
     busboy.on('finish', function() {
       const { param1, param2, filename, date } = JSON.parse(JSON.stringify(body))

       Goods.findById(id)
         .then(goods => {
           goods.param1 = param1 || goods.param1
           goods.param2 = param2 || goods.param2
           goods.filename = filename || goods.filename
           goods.date = date || goods.date

           goods.save()
             .then(() => res.end(JSON.stringify('Goods updated!')))
             .catch(err => res.end(JSON.stringify(err)))
         })
         .catch(err => JSON.stringify(err))

       newGoods.save()
         .then(() => res.end('Done!'))
         .catch(err => res.end(JSON.stringify(err)))
      })
    return req.pipe(busboy)
}

// 5 Deletes a product
async function deleteProduct(req,res, id) {
  Goods.findByIdAndDelete(id)
    .then(() => res.end(JSON.stringify('Goods deleted!')))
    .catch(err => res.end(JSON.stringify(err)))
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
