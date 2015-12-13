var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MsgSchema = new Schema({
  date: Date,
  toName: String,
  toNum: Number,
  msgText: String,
  match: Boolean
});

var Msg = mongoose.model('Msg', MsgSchema);
module.exports = Msg;
