const express = require('express')
const router = express.Router()
// const {checkAuthenticated} = require('../config/authenticate')

// isAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) { return next() }
//     res.redirect("/users/login")
//   }

router.get('/',  (req, res) => res.render('index'))

module.exports = router