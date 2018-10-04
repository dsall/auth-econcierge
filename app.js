// Load the AWS SDK for Node.js
const mongoose = require('mongoose');
const User = require('./users');
const bcrypt = require('bcrypt');
const passportSetup = require('./auth/passport');
var flash = require('connect-flash');
const passport = require('passport');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
//qkfbZ8DHGPyEH2xD
var session = require('express-session');

app.use(express.static('public'));

// initialize passport
app.use(passport.initialize());

// var Bucket = "webvrworkshop";

//1EQI2P6yWRoMz3qg

// Connect Flash
app.use(flash());

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
mongoose.connect(
    "mongodb+srv://matt:1EQI2P6yWRoMz3qg@cluster0-exl40.mongodb.net/Face-Recog",  { useNewUrlParser: true }
  );




app.get('/', function(req, res) {
  res.send('Welcome');
});
app.get('/signup', function(request, response) {
    response.sendFile(__dirname + '/signup.html');
  });
app.get('/login', function(request, response) {
  response.sendFile(__dirname + '/signin.html');
});

app.post('/in',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
	function (req, res) {
    console.log(req.body);
		res.redirect('/');
	});



app.get('/register', function(req, res) {
       const user = new User({
        _id: new mongoose.Types.ObjectId(),
        first_name: req.query.first_name,
        last_name: req.query.last_name,
        password: bcrypt.hashSync(req.query.psw, 10),
        email: req.query.email,
        phone: req.query.phone,
      });

    if(req.query.psw === req.query.rppswd){
        user
        .save()
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
          //console.log(err);
          res.status(500).json({
            error: err
          });
        });
    }
  });


CheckPassword = (password, hash)  => {
    var result = bcrypt.compareSync(password, hash);
    return result;
}

  app.get('/CheckLogin', function(req, res) {
        User.findOne({email: req.query.email})
        .exec()
        .then(data =>{
            var result = CheckPassword(req.query.psw, data.password);
            if(result){
                res.redirect('/');
            }
            else{
                res.send('incorrect password');
            }
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
  });


app.listen(3000, function () {
	console.log('Listening on port 3000');
})