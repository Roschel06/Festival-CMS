const mongoose = require('mongoose')
const {Schema} = mongoose

const bandInFestivalSchema = new Schema({
    band: {
        type: Schema.Types.ObjectId,
        ref: 'Band'
    },
    festival: {
        type: Schema.Types.ObjectId,
        ref: 'Festival' 
    },
    day: {
        type: String
    },
    time: {
        type: String
    },
    stage: {
        type: String
    },
    fee: {
        type: String
    },
    equipmentDemands: {
        type: String
    },
    otherDemands: {
        type: String
    },
    cancelled: {
        type: Boolean
    }

}) 

module.exports = mongoose.model('Bandinfestival', bandInFestivalSchema)