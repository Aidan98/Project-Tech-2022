const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/authenticate')
const Account = require('../models/accounts')
const assert =require ('assert')



router.get('/', ensureAuthenticated, (req, res) =>{
    res.render('index', {
        name: req.user.name,
        email: req.user.email,
        genre : req.user.genre
    })  
})

router.post('/update/', function(req, res, next) {
        Account.findOneAndUpdate( {name:req.user.name}, {name:req.body.name}, {new: true}, (err, data) => {
                if(err){
                    console.log(err)
                }
                else{
                    console.log('details succesfully updated')
                //   req.flash('success', 'User has been updated successfully!');
                //   res.redirect('/');
                }
        }) 
        Account.findOneAndUpdate( {email: req.user.email}, {email: req.body.email}, {new: true}, (err, data) => {
            if(err){
                console.log(err)
            }
            else{
                console.log('details succesfully updated')
            //   req.flash('success', 'User has been updated successfully!');
            //   res.redirect('/');
            res.redirect('/');
            }
    }) 
    })

module.exports = router