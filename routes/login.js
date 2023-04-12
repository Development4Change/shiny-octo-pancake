const express = require('express')
const router = express.Router()
const User = require('../models/users')
//const jwt = require('jsonwebtoken');
//const { JsonWebTokenError } = require('jsonwebtoken')
//const email = req.body.email
//const password = req.body.password
//var session


router.get('/', (req, res) => {
    session=req.session;
    if(session.userid){
        res.send("index");
    }else
    res.render('login');
    console.log('Successful login launch')
   
})

router.post('/', async (req, res) => {
 //Authenticate User
   try{
        const check = await User.findOne({ email: req.body.email })

        if(check.password === req.body.password){
            session=req.session;
            session.userid=req.body.email;
            console.log(req.session)
            res.render('index')
        }
        else{
            res.send('Incorrect details')
        }
    }catch (e){
        console.log(e)
        res.send('Incorrect Email or Password')
    }
   
    /*const email = req.body.email
    const user = {username: email}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})*/
})

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/login');
    console.log('session destroyed')
});

module.exports = router