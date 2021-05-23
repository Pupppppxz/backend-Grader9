const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    input: {
        type: String,
        require: true
    },
    output: {
        type: String,
        require: true
    },
    scorePerCase: {
        type: Number,
        require: true
    },
    question: {
        type: String,
        require: true
    },
    rank: {
        type: Number,
        require: true
    },
    finished: {
        type: Number,
        default: 0
    },
}, {
    timestamps: { currentTime: Date.now }
})

const QuestionModel = mongoose.model("question", QuestionSchema)
module.exports = QuestionModel