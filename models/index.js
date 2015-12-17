var mongoose = require('mongoose');
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  'mongodb://localhost/extalk');

var User = require('./user');
var Msg = require('./msg');
var Meet = require('./meet');

module.exports.User = User;
module.exports.Msg = Msg;
module.exports.Meet = Meet;
