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
        },
        currentFestival: {
            type: Schema.Types.ObjectId,
            ref: 'Festival'
        },
        festivals: [{
            type: Schema.Types.ObjectId,
            ref: 'Festival'
        }],
        stages: [{
            type: Schema.Types.ObjectId,
            ref: 'Stage'
        }],
        bands: [{
            type: Schema.Types.ObjectId,
            ref: 'Band'
        }],
        facilities: [{
            type: Schema.Types.ObjectId,
            ref: 'Facility'
        }],
        shopping: [{
            type: Schema.Types.ObjectId,
            ref: 'Shopping'
        }],
        gastronomy: [{
            type: Schema.Types.ObjectId,
            ref: 'Gastronomy'
        }]
}) 

module.exports = mongoose.model('User', userSchema)