const express = require('express')
const router = express.Router()
const Survey = require('../models/survey')


// survey page route
router.get('/', (req, res) => {
    console.log('Successful survey launch');
    res.render('survey')
})


// leave survey/review route
router.post('/', async(req, res) => {

    //console.log function in order to confirm route entrance
    console.log('survey post route reached')

    try{

        const data={
            createdDate: new Date(),
            serviceProvider: req.body.serviceProvider,
            firstVisit: req.body.firstVisit,
            servicesRequested: req.body.servicesRequested,
            rankKnowledge: req.body.rankKnowledge,
            timely: req.body.timely,
            rankQuality: req.body.rankQuality,
            metNeeds: req.body.metNeeds,
            comments: req.body.comments,
        }

        await Survey.insertMany([data])
        
        const surveys = await Survey.find({});
        res.redirect('manageReports')

    }catch (e){

        console.log(e)
    }
})

module.exports = router