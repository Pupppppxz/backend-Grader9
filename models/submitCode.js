const mongoose = require('mongoose')

const SubmitCodeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
}, {
    timestamps: { currentTime: Date.now }
})

const SubmitCodeModel = mongoose.model("SubmitCode", SubmitCodeSchema)
module.exports = SubmitCodeModel