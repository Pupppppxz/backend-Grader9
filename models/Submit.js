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
    status: {
        type: Number,
        require: true
    },
    result: {
        type: String,
        default: "---"
    },
    score: {
        type: Number,
        require: true
    }
}, {
    timestamps: { currentTime: Date.now }
})

const SubmitModel = mongoose.model("Submit", SubmitSchema)
module.exports = SubmitModel