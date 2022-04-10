// const { Route } = require('express')
const express = require('express')
const router = express.Router()
const Account = require('../models/accounts')
const argon2 = require ('argon2')
const passport = require('passport')
const multer = require('multer')

//RENDER PAGES
router.get('/login', (req, res) => res.render('login'))
router.get('/register', (req, res) => res.render('register'))

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '.')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, `/public/uploads/${file.fieldname}-${Date.now()}.${ext}`)
    },
})

const upload = multer({
    storage: multerStorage
})

// REGISTER HANDLER
router.post('/register', upload.single('profile_pic'), (req, res) =>{
    console.log(req.body)
    const { name, email, password, password2, genre} = req.body
    let profile_pic

    if (!req.file) {
        console.log('IS THIS WORKING?????')
        profile_pic = `https://avatars.dicebear.com/api/identicon/${name}.svg`
    } else {
        profile_pic = req.file.filename
        console.log(profile_pic)
    }

    let errors = []

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
                    genre,
                    profile_pic
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

// LOGIN HANDLER
router.post('/login', (req, res, next)=> {
    let errors = [];
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login', 
    })(req, res, next)
    errors.push({msg: 'email not found'}) 
})

//LOGOUT HANDLER
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/users/login')
  })
module.exports = router