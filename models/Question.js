const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    chaya: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    linkPDF: {
        type: String,
        required: true
    },
    str_input_1: {
        type: String,
        required: true
    },
    str_output_1: {
        type: String,
        required: true
    },
    str_input_2: {
        type: String,
        required: true
    },
    str_output_2: {
        type: String,
        required: true
    },
    str_input_3: {
        type: String,
        required: true
    },
    str_output_3: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    q_input: {
        type: String,
        required: true
    },
    q_output: {
        type: String,
        required: true
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