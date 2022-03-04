// const { Route } = require('express')
const express = require('express')
const router = express.Router()
const  account = require('../models/accounts')
const bcrypt = require ('bcryptjs')

//RENDER PAGES
router.get('/login', (req, res) => res.render('login'))
router.get('/register', (req, res) => res.render('register'))

// REGISTER HANDLER
router.post('/register', (req, res) =>{
    const { name, email, password, password2} = req.body
    let errors = [];

    //CHECK FIELDS
    if (!name || !email || !password || !password2 ) {
        errors.push({msg: 'Please fill in all fields'})   
    }

    //CHECK PASSWORDS
    if (password != password2) {
        errors.push({ msg: 'Please make sure your passwords match'})
    }

    //CHECK PASSWORD LENGTH
    if (password.length < 8) {
        errors.push({msg: 'Your password needs to be at least 8 characters long'})
    }
    //RENDER PAGE WITH DATA
    if (errors.length > 0 ) {
        res.render('./register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }  else {
        account.findOne({email: email})
        .then(account => {
            if (account) {
                // ACCOUNT ALREADY EXISTS
                errors.push({msg: 'This email is already in use'})
                res.render('./register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            } else {
                const newAccount = new Account({
                    name,
                    email,
                    password
                })
                console.log(newAccount)
                res.send('account created')
            }
        })
    }

})


module.exports = router