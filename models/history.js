const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
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
    },
}, {
    timestamps: { currentTime: Date.now }
})

const HistoryModel = mongoose.model("History", historySchema)
module.exports = HistoryModel