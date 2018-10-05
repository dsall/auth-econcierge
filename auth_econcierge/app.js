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
    "mongodb+srv://matt:1EQI2P6yWRoMz3qg@cluster0-exl40.mongodb.net/Face-Recog",  { useNewUrlParser: true }
  );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan('dev'));
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


app.post('/register', function (req, res){
    console.log(req.body);
    const user = new User({
        username: req.body.username,
        password: req.body.password
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

app.get('/', function(req, res) {
    console.log(req.flash);
    res.send('Home')
  });


  app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/pages/login.html');
  });


  app.listen(3000, function () {
	console.log('Listening on port 3000');
})
