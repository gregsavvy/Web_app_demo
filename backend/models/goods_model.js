const mongoose = require('mongoose')

const Schema = mongoose.Schema

const goodsSchema = new Schema({
  param1: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  param2: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    minlength: 5
  },
  param3: {
    type: Boolean,
    required: true,
    unique: false,
    trim: false,
    minlength: 3
  },
  filename: {
    data: Buffer,
    type: Array,
  },
  date: {
    type: Date,
    required: true,
  },
}, {timestamps: true,
})

goodsSchema.index({param1: 'text'}, {param3: Boolean})

const Goods = mongoose.model('Goods', goodsSchema)

// Initial goods to fill MongoDB for testing purposes
const initialGood1 = new Goods({
  param1: 'Test name 1',
  param2: 'Test description of a product 1',
  param3: true,
  filename: [ipad_1614019907969_, macbook1_1614020016674_, macbook2_1614020016680_],
  date: Date.now()
}).save()

const initialGood2 = new Goods({
  param1: 'Test name 2',
  param2: 'Test description of a product 2',
  param3: false,
  filename: [macbook3_1614020016684_, surface1_1614019847525_],
  date: Date.now()
}).save()
// ---

module.exports = Goods
