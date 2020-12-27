let Goods = require('../models/goods_model')
const multer = require('multer')

// forming JSON body - utility function for create and update API
  function readyJSON(req) {
      return new Promise((resolve, reject) => {
          try {
              let body = ''

              req.on('data', (chunk) => {
                  body += chunk.toString()
              })

              req.on('end', () => {
                  resolve(body)
              })
          } catch (error) {
              reject(err)
          }
      })
  }
//

// file upload storage
const storageConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path('./src/img/'))
  },
  filename: (req,file,callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({storage:storageConfig});

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

  upload.single('img')

  const body = await readyJSON(req)
  const { param1, param2, img, date } = JSON.parse(body)

  const newGoods = new Goods({
    param1,
    param2,
    img,
    date
  })

  newGoods.save()
    .then(() => res.end(JSON.stringify('Goods Added!')))
    .catch(err => res.end(JSON.stringify(err)))
 }

// 4 Updates a product
async function updateProduct(req, res, id) {
  upload.single('img')

  const body = await readyJSON(req)
  const { param1, param2, img, date } = JSON.parse(body)

  Goods.findById(id)
    .then(goods => {
      goods.param1 = param1 || goods.param1
      goods.param2 = param2 || goods.param2
      goods.img = img || goods.img
      goods.date = date || goods.date

      goods.save()
        .then(() => res.end(JSON.stringify('Goods updated!')))
        .catch(err => res.end(JSON.stringify(err)))
    })
    .catch(err => JSON.stringify(err))
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
