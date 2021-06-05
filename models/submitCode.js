const mongoose = require('mongoose')

const SubmitCodeSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    questionId: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    finished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { currentTime: Date.now }
})

const SubmitCodeModel = mongoose.model("SubmitCode", SubmitCodeSchema)
module.exports = SubmitCodeModel