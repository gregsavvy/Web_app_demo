const fs = require('fs')
const os = require('os')
const path = require('path')

var dir = path.resolve('./src/img/')

// 1 Gets image
async function getIMG(req,res,img) {
  try {
    var stream = fs.createReadStream(`${dir}/` + `${img}`)
      stream.on('open', function () {
          stream.pipe(res)
      })
      stream.on('error', function () {
          res.end(JSON.stringify('Not found'))
      })
    } catch (error) {
      console.log(error)
    }
  }

module.exports = {
  getIMG
}
