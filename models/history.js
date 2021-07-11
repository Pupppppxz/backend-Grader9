const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    result: {
        type: String,
        default: "---"
    },
    score: {
        type: Number,
        required: true
    },
}, {
    timestamps: { currentTime: Date.now }
})

const HistoryModel = mongoose.model("History", historySchema)
module.exports = HistoryModel