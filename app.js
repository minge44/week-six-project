var express = require('express');
var mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');
var bodyParser = require('body-parser');

var app = express();  //app
var User = require('./models/User')
var db = mongoose.connect('/mongodb://localhost:27017/gabble')

app.use(express.static('public'));//setup
app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({ extended: true })); //encodes data which is parsed, turns into json
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.render('index', {title: 'home'});
});
app.get('/login', function(req, res){
  res.render('login');

});
app.post('/login', function(req, res){
  res.send(req.body);
});
app.post('/register', function(req, res){  //check if username and password exist, if not error
  if (req.body.username && req.body.password) {

    User.create({
      username: req.body.username,
      password: req.body.password
    }, function(error, user) {
        if (error) {
          res.render('error', {
            title: 'error',
            error: 'user was not created'
          });
        } else {
          res.send.(user);
        }
      });

  } else {
    res.render('error', {
      title: 'error',
      error: 'username or password required'});
  }

});
app.listen(3000, function () {
  console.log('Successfully started express application!')
});
