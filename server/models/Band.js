const mongoose = require('mongoose')
const {Schema} = mongoose

const bandSchema = new Schema({
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

    contactPerson: {
        firstName: {
            type: String
        },
    
        lastName: {
            type: String
        }
    },

    address: {
        street: {
            type: String
        },

        houseNumber: {
            type: String
        },

        zip: {
            type: String
        },

        city: {
            type: String
        },

        country: {
            type: String
        }
    },

    contact: {
        email: {
            type: String
        },
    
        phone: {
            type: String
        }
    },

    genre: [String],

    countryOfOrigin: {
        type: String
    },

    description: {
        type: String
    },

    links: {

        website: {
            type: String
        },

        facebook: {
            type: String
        },

        instagram: {
            type: String
        },

        youtube: {
            type: String
        },

        twitter: {
            type: String
        }
    },

    festivalSpecifications: [{
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
    }]

}) 

module.exports = mongoose.model('Band', bandSchema)