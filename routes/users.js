const { Route } = require('express')
const express = require('express')
const router = express.Router()

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

    if (errors.length > 0 ) {
        res.render('./register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } 

})


module.exports = router