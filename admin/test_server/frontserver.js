var path = require('path')
var express = require('express')
var app = express()

var dir = path.resolve(__dirname, '../')

app.use(express.static(dir))

app.listen(8081, function (error) {
    if (error) throw error
    console.log(`Listening on port 8081`)
})
