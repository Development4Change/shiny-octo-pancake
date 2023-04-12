const express = require('express')
const router = express.Router()
const Survey= require('../models/survey')



router.get('/', async (req, res) => {
    console.log('Successful manage reports launch')
    
    await Survey.find({}, function(err, surveys) {
        res.render('manageReports', {
            surveysList: surveys
        })
    })
})



module.exports = router