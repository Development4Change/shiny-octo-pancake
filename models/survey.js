const mongoose = require ('mongoose')

const surveySchema = new mongoose.Schema({
    createdDate:{
        type: Date,
    },
    serviceProvider: {
        type: String, 
        required: true
    },
    firstVisit: {
        type: String,
        required: true
    },
    servicesRequested: {
        type: String,
        required: true
    },
    rankKnowledge: {
        type: String,
        required: true
    },
    timely: {
        type: String,
        required: true
    },
    rankQuality: {
        type: String,
        required: true
    },
    metNeeds: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Survey', surveySchema)