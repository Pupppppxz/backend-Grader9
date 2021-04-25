const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
  nickName: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  userStatus: {
    type: String,
    default: 'user'
  },
  hash: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0
  },
  pass: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel
