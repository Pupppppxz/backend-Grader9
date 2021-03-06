const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userStatus: {
    type: String,
    default: "user"
  },
  hash: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0
  },
  profilePicture: {
    type: String,
    default: "undefined"
  },
  group: {
    type: Number, 
    required: true 
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
