var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/extalk');

var User = require('./user');
var Msg = require('./msg');
var Meet = require('./meet');

module.exports.User = User;
module.exports.Msg = Msg;
module.exports.Meet = Meet;
