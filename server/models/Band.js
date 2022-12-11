const mongoose = require('mongoose')
const {Schema} = mongoose

const bandSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    
    name: {
        type: String,
        required: true,
    },

    logo: {
        type: String
    },

    image: {
        type: String
    },

    contactFirstName: {
        type: String
    },

    contactLastName: {
        type: String
    },
    contactStreet: {
        type: String
    },

    contactHouseNumber: {
        type: String
    },

    contactZip: {
        type: String
    },

    contactCity: {
        type: String
    },

    contactCountry: {
        type: String
    },
    contactEmail: {
        type: String
    },

    contactPhone: {
        type: String
    },

    genre: [String],

    countryOfOrigin: {
        type: String
    },

    description: {
        type: String
    },

    linkWebsite: {
        type: String
    },

    linkFacebook: {
        type: String
    },

    linkInstagram: {
        type: String
    },

    linkYoutube: {
        type: String
    },

    linkTwitter: {
        type: String
    },
    festival: [{
        type: Schema.Types.ObjectId,
        ref: 'BandFestival' 
    }]

}) 

module.exports = mongoose.model('Band', bandSchema)