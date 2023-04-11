const express = require('express')
const router = express.Router()
const User = require('../models/users')

// Registration page route
router.get('/', (req, res) => {
     res.render('register')
     console.log('Successful register launch')
})

// Create User Route
router.post('/', async(req, res) => {
     
     try{
          const data={
               firstname: req.body.firstname,
               lastname: req.body.lastname,
               email: req.body.email,
               password: req.body.password,
          }

          await User.insertMany([data])

          res.render('login')

     }catch (e){
          console.log(e)
          res.send('Email already exists in our system.')
     }
})

module.exports = router