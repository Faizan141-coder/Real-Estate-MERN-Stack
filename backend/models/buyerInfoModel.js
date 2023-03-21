const mongoose = require('mongoose')

const Schema = mongoose.Schema

const buyerInfoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('workout', buyerInfoSchema)