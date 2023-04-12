const express = require('express')
const router = express.Router()
const User = require('../models/users')
var ObjectId = require('mongodb').ObjectID;



router.get('/', async (req, res) => {
    console.log('Successful dashboard launch')
    
    await User.find({}, function(err, users) {
        res.render('dashboard', {
            userList: users
        })
    })
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

         res.redirect('/dashboard')
         

    }catch (e){
         console.log(e)
         res.send('Email already exists in our system.')
    }
})


// Delete User Route
router.post('/delete', async(req, res) => {
     
    try{
         //await User.deleteOne( { "_id" : ObjectId(req.body.userid) } );
         await User.deleteOne( { "email" : req.body.emaild } );

         res.redirect('/dashboard')

    }catch (e){
         console.log(e)
         res.send("This Email doesnt exist.")
    }
})


module.exports = router