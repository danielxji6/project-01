// delete all user list

var db = require('./models');

db.User.remove({}, function (err, users) {
  if(err) { return console.log("ERROR: ", err);}
  console.log("Delete all users!!");
  process.exit();
});

// db.Meet.remove({}, function (err, meets) {
//   if(err) { return console.log("ERROR: ", err);}
//   console.log("Delete all meets!!");
//   process.exit();
// });
