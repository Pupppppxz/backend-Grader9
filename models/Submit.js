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
    result: {
        type: String,
        require: true
    },
}, {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

const SubmitModel = mongoose.model("Submit", SubmitSchema)
module.exports = SubmitModel