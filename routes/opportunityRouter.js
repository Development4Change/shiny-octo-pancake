const express = require('express')
const router = express.Router()
const Opportunity = require('../models/opportunityModel')

// opportunity page route
router.get('/', (req, res) => {
    console.log('Successful opportunities launch');
    res.render('opportunity')
});

// leave opportunity route
router.post('/', async(req, res) => {

    //console.log function in order to confirm route entrance
    console.log('opportunity post route reached')

    try{

        const data = {
          postedDate: new Date(),
          serviceProvider: req.body.serviceProvider,
          serviceRequired: req.body.serviceRequired,
          contactNumber: req.body.contactNumber,
          email: req.body.email, 
          time: req.body.time,
          date: req.body.date, 
          location: req.body.location, 
          additionalInfo: req.body.additionalInfo
        }

        await Opportunity.insertMany([data])

        // Fetch the opportunities from the database and pass them to the view
        const opportunities = await Opportunity.find({});
        res.render('opportunities', { opportunities: opportunities });


    }catch (e){

        console.log(e)
    }
})

// Edit opportunity route
router.get('/opportunity/edit/:id', async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    res.render('editOpportunity', { opportunity: opportunity });
  } catch (error) {
    console.error(error);
  }
});

// Update opportunity route
router.post('/opportunity/edit/:id', async (req, res) => {
  try {
    const data = {
      serviceProvider: req.body.serviceProvider,
      serviceRequired: req.body.serviceRequired,
      contactNumber: req.body.contactNumber,
      email: req.body.email, 
      time: req.body.time,
      date: req.body.date, 
      location: req.body.location, 
      additionalInfo: req.body.additionalInfo
    };
    await Opportunity.findByIdAndUpdate(req.params.id, data);
    res.redirect('/postedOpportunities');
  } catch (error) {
    console.error(error);
  }
});

// Delete opportunity route
router.post('/opportunity/delete/:id', async (req, res) => {
  try {
    await Opportunity.findByIdAndRemove(req.params.id);
    res.redirect('/postedOpportunities');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router