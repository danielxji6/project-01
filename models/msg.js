var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MsgSchema = new Schema({
  date: Date,
  toNum: Number,
  msgText: String,
  match: Boolean
});

var Msg = mongoose.model('Msg', msgSchema);
module.exports = Msg;
