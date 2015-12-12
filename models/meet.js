var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MeetSchema = new Schema({
  date: Date,
  postText: String,
  comments: [String]
});

var Meet = mongoose.model('Meet', MeetSchema);
module.exports = Meet;
