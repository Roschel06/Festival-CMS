const mongoose = require('mongoose')
const {Schema} = mongoose

const bandAttendanceSchema = new Schema({
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
    furtherDemands: {
        type: String
    },
    cancelled: {
        type: Boolean
    }

}) 

module.exports = mongoose.model('Bandattendance', bandAttendanceSchema)