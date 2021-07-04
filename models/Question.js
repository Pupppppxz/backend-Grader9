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
    chaya: {
        type: String,
        require: true
    },
    unit: {
        type: String,
        require: true
    },
    question: {
        type: String,
        require: true
    },
    detail: {
        type: String,
        require: true
    },
    linkPDF: {
        type: String,
        require: true
    },
    str_input_1: {
        type: String,
        require: true
    },
    str_output_1: {
        type: String,
        require: true
    },
    str_input_2: {
        type: String,
        require: true
    },
    str_output_2: {
        type: String,
        require: true
    },
    str_input_3: {
        type: String,
        require: true
    },
    str_output_3: {
        type: String,
        require: true
    },
    rank: {
        type: Number,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    status: {
        type: Number,
        default: 0
    },
    q_input: {
        type: String,
        require: true
    },
    q_output: {
        type: String,
        require: true
    },
    finished: {
        type: Number,
        default: 0
    },
    opened: {
        type: Number,
        default: 0
    }
}, {
    timestamps: { currentTime: Date.now }
})

const QuestionModel = mongoose.model("question", QuestionSchema)
module.exports = QuestionModel