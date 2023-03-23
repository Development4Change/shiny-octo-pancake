const express = require('express')
const router = express.Router()
const User = require('../models/users')


router.get('/', (req, res) => {
    console.log('Successful login launch')
    res.render('login');
})

router.post('/', async (req, res) => {
 
   try{
        const check = await User.findOne({ email: req.body.email })

        if(check.password === req.body.password){
            res.render('index')
        }
        else{
            res.send('Incorrect details')
        }
    }catch (e){
        console.log(e)
        res.send('Incorrect Email or Password')
    }
})

module.exports = router