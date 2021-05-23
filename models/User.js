const mongoose = require('mongoose')

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
<<<<<<< HEAD
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
}, {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
=======
  totalSubmit: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
>>>>>>> 9e423391444c23441d3eb69cfc89a82301ef6e97
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel
