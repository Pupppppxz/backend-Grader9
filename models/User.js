const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  nickName: {
    type: String,
    unique: true
  },
  username: {
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
  profilePicture: {
    type: String,
    default: null
  },
  userRank: {
    type: Number,
    default: 1
  },
}, {
  timestamps: { currentTime: Date.now }
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel
