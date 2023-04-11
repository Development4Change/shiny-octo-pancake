const express = require('express')
const router = express.Router()
const Survey = require('../models/survey')

const getSurveys = async () => {
    try {
      return await Survey.find({});
    } catch (error) {
      console.error(error);
      return [];
    }
  };

// survey page route
router.get('/survey', (req, res) => {
    console.log('Successful survey launch');
    res.render('survey')
})

router.get('/report', async (req, res) => {
    console.log('Successful posted opportunities launch');
    try {
      const surveys = await getSurveys();
      res.render('userReport', { surveys });
    } catch (error) {
      console.error(error);
    }
  });



// leave survey/review route
router.post('/survey', async(req, res) => {

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
        res.render('userReport',{surveys : surveys});

    }catch (e){

        console.log(e)
    }
})

module.exports = router