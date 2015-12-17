var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user');

var MeetSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  postText: String,
  comments: [String]
});

var Meet = mongoose.model('Meet', MeetSchema);
module.exports = Meet;
