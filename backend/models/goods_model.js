const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goodsSchema = new Schema({
  param1: {
    type: String,
    required: true,
    unique: false,
    trim: false,
    minlength: 3
  },
  param2: {
    type: String,
    required: false,
    unique: false,
    trim: false,
    minlength: 3
  },
  imgpath: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {timestamps: true,
});

const Goods = mongoose.model('Goods', goodsSchema);

module.exports = Goods;