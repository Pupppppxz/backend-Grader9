const mongoose = require('mongoose')

const checkSchema = new mongoose.Schema({
    questionId: {
        type: String,
        require: true,
    }, 
    status: {
        type: Number,
        default: 0
    }
}, {
    timestamps: { currentTime: Date.now }
})

const CheckModel = new mongoose.model("checkQuestion", checkSchema)
module.exports = CheckModel