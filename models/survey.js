const mongoose = require ('mongoose')

const surveySchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    service: {
        type: String, 
        required: true
    },
    rating: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('Survey', surveySchema) 