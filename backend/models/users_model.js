const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: false,
    minlength: 8
  },
  date: {
    type: Date,
    required: true,
  },
}, {timestamps: true,
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
