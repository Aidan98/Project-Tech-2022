const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/authenticate')
const Account = require('../models/accounts')


router.get('/', ensureAuthenticated, (req, res) =>{
    res.render('index', {
        name: req.user.name
    })  
})
module.exports = router