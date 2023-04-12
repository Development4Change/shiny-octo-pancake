const express = require('express');
const router = express.Router();
const Opportunity = require('../models/opportunityModel');

const getOpportunities = async () => {
  try {
    return await Opportunity.find({});
  } catch (error) {
    console.error(error);
    return [];
  }
};

router.get('/postedOpportunities', async (req, res) => {
  console.log('Successful posted opportunities launch');
  try {
    const opportunities = await getOpportunities();
    res.render('opportunities', { opportunities });
  } catch (error) {
    console.error(error);
  }
});

router.get('/search', async (req, res) => {
  console.log('Searching posted opportunities');
  try {
    let opportunities = await getOpportunities();
    const query = req.query.query;
    const sort = req.query.sort;

    if (query) {
      const regex = new RegExp(query, 'i');
      opportunities = opportunities.filter(opportunity => {
        return Object.values(opportunity.toObject()).some(value =>
          regex.test(value.toString())
        );
      });
    }

    if (sort) {
      opportunities.sort((a, b) => {
        if (sort === 'serviceProvider') {
          return a.serviceProvider.localeCompare(b.serviceProvider);
        } else if (sort === 'postedDate') {
          return new Date(b.postedDate) - new Date(a.postedDate);
        }
      });
    }

    res.render('opportunities', { opportunities });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;