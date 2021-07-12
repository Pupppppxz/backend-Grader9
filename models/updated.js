const mongoose = require('mongoose')

const updatedSchema = new mongoose.Schema({
    updated: {
        type: Boolean,
        default: true,
    },
    userId: { 
        type: String,
        required: true
    }
}, {
    timestamps: { currentTime: Date.now }
})

const UpdatedModel = mongoose.model('Updated', updatedSchema)
module.exports = UpdatedModel