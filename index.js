const ejs = require('ejs');
const express = require('express'); 


const app = express();

const login = require('./routes/login')

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('static'))
app.use('/public', express.static(__dirname + '/public/'))

app.get('/', login) 

  app.get('/register', function (req, res){
    res.send('Registration form')
  });

  app.get('*', function(req, res){
    res.send('error 404 not found', 404);
  });

  app.listen(3000)

