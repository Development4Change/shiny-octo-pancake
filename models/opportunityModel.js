const mongoose = require ('mongoose')

const opportunitySchema = new mongoose.Schema({
    postedDate: {
        type: Date,
    },
    serviceProvider: {
        type: String,
        required: true
    },
    serviceRequired: {
        type: String,
        required: true
    }, 
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }, 
    additionalInfo: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Opportunity', opportunitySchema)