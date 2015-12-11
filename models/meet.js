var monngoose = require('mongoose'),
    Schema = mongoose.Schema;

var MeetSchema = new Schema({
  userId: String,
  date: Date,
  postText: String
});

var Meet = mongoose.model('Meet', MeetSchema);
module.exports = Meet;
