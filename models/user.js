var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    Msg = require('./msg'),
    Meet = require('./meet');

var UserSchema = new Schema({
  username: String,
  password: String,
  phoneNum: Number,
  location: String,
  msg: [Msg.schema],
  _meet: { type: Schema.Types.ObjectId, ref: 'Meet' },
  remindText: Boolean
});

UserSchema.plugin(passportLocalMongoose, {
  populateFields: 'posts'
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
