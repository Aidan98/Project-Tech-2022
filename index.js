// https://github.com/ranisalt/node-argon2/wiki/Migrating-from-another-hash-function
require('dotenv').config()
const ejs = require('ejs')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const assert =require ('assert')


const app = express();
const EXPsession = process.env.SecretSESSION
const dbKey = process.env.MongoURI

mongoose.connect(dbKey, { useNewURLParser: true })
  .then(() => console.log('Database has been connected.'))
  .catch(err => console.log(err))

require('./config/verifyAccount')(passport)

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('static'))
app.use('/public', express.static(__dirname + '/public/'))

// EXPRESS SESSION
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: EXPsession,
    resave: false,
    saveUninitialized: false
  })
)

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use('/', require('./routes/home'))
app.use('/users', require('./routes/users'))

app.get('*', function (req, res) {
  res.send('error 404 not found', 404)
})


app.listen(3000)

