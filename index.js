const ejs = require('ejs');
const express = require('express'); 
const mongoose = require('mongoose');


const app = express();

const db = require('./config/keys').MongoURI

mongoose.connect(db, { useNewURLParser: true})
.then(() => console.log('Database has been connected.'))
.catch(err => console.log(err))

// const login = require('./routes/login')
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('static'))
app.use('/public', express.static(__dirname + '/public/'))

//ROUTES
app.use('/', require('./routes/home'))
app.use('/users', require('./routes/users'))
// app.use('/login', require('./routes/login'))
// app.use('/register', require('./routes/register'))

  

  app.get('*', function(req, res){
    res.send('error 404 not found', 404)
  })

  app.listen(3000)

