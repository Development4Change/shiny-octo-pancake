const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
     console.log('Successful index launch');
     res.render('login')
})

router.post('/', (req, res) => {
     
})

module.exports = router