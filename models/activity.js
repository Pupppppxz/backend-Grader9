const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    }, 
    questionId: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    status: {
        type: Number,
        require: true
    },
    result: {
        type: String,
        default: "---"
    }
})

const activityModel = mongoose.model("activity", activitySchema)
module.exports = activityModel