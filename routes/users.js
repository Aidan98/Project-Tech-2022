// const { Route } = require('express')
const express = require('express')
const router = express.Router()
const  Account = require('../models/accounts')
const argon2 = require ('argon2')

//RENDER PAGES
router.get('/login', (req, res) => res.render('login'))
router.get('/register', (req, res) => res.render('register'))

// REGISTER HANDLER
router.post('/register', (req, res) =>{
    console.log(req.body)
    const { name, email, password, password2, genre} = req.body
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
            password2,
            genre
        })
    }  else {
        Account.findOne({email: email})
        .then( async account => {
            if (account) {
                // ACCOUNT ALREADY EXISTS
                errors.push({msg: 'This email is already in use'})
                res.render('./register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    genre
                })
            } else {
                const newAccount = new Account({
                    name,
                    email,
                    password,
                    genre
                })
                try {
                    const hash = await argon2.hash(newAccount.password, {hashLength: 10});
                    // SET STRING PASSWORD TO HASHED PASSWORD
                    newAccount.password = hash
                    newAccount.save()
                    .then(account =>{
                        res.redirect('/users/login')
                    })
                    .catch()
                  } catch (err) {
                    throw err
                  }
        }
        })
    }

})


module.exports = router