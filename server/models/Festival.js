const mongoose = require('mongoose')
const {Schema} = mongoose

const festivalSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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
    }],
}) 

module.exports = mongoose.model('Festival', festivalSchema)