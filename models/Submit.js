const mongoose = require('mongoose')

const SubmitSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    questionId: {
        type: String,
        require: true
    },
    score: {
        type: Number,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    result: {
        type: String,
        require: true
    }
})

const SubmitModel = mongoose.model("Submit", SubmitSchema)
module.exports = SubmitModel