const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const Users = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

Users.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
Users.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('Users', Users);
