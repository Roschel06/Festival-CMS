const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    password: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    role: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
}) 

module.exports = mongoose.model('User', userSchema)