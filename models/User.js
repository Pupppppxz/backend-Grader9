const mongoose = require('mongoose')

const nickName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
const UserSchema = new mongoose.Schema({
  nickName: {
    type: String,
    default: nickName
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
    default: "undefined"
  },
  userRank: {
    type: Number,
    default: 1
  },
  group: {
    type: String, 
    default: "unknown" 
  }, 
  commit: {
    type: Number,
    default: 0
  },
  finished: {
    type: Number,
    default: 0
  }
}, {
  timestamps: { currentTime: Date.now }
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel
