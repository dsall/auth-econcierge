var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();
var morgan = require('morgan');
const User = require('./models/user');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

mongoose.connect(
    "mongodb+srv://matt:1EQI2P6yWRoMz3qg@cluster0-exl40.mongodb.net/Face-Recog",  { useNewUrlParser: true,}
  );


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
// app.use(morgan('dev'));
app.use(session({
    secret:'secret123',
    saveUninitialized: true,
    resave:true
}));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./passport/passport');
var us = new User();

app.post('/register', function (req, res){
    console.log(req.body);

    const user = new User({
        username: req.body.username,
        password: us.generateHash(req.body.password),
      });

        user
        .save()
        .then(result => {
            res.send(doc);
        })
        .catch(err => {
          //console.log(err);
          res.status(500).json({
            error: err
          });
        });
})

app.post('/login',
    passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: true}),
    function (req, res) {
        res.redirect('/', req.user.username);//accessing a user object
});

app.get('/', Authenticated, function(req, res) {
  res.sendFile(__dirname + '/pages/home.html');
  });


  app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/pages/login.html');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  function Authenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      //req.flash('error_msg','You are not logged in');
      res.redirect('/login');
    }
  }


  app.listen(3000, function () {
	console.log('Listening on port 3000');
})
