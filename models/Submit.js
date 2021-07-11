const mongoose = require('mongoose')

const SubmitSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: Number,
        require: true
    },
    result: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
}, {
    timestamps: { currentTime: Date.now }
})

const SubmitModel = mongoose.model("Submit", SubmitSchema)
module.exports = SubmitModel