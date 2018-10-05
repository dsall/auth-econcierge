const mongoose = require('mongoose');
mongoose.connect(
    "mongodb+srv://matt:1EQI2P6yWRoMz3qg@cluster0-exl40.mongodb.net/Face-Recog",  { useNewUrlParser: true }
  );


const User = require('./users');

var us = new User ();

User.findOne({email: "salldl@mail.uc.edu"})
.exec()
.then((doc) => {
    var res = us.validPassword("sallibou1994");
    console.log(res);
})
.catch((err) => {console.log(err)});