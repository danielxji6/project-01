var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Msg = require('./msg'),
    Meet = require('./meet');

var UserSchema = new Schema({
  userName: String,
  phoneNum: Number,
  location: String,
  msg: [Msg],
  meet: Meet,
  remindText: Boolean
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
