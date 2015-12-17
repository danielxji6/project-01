// get all user list

var db = require('./models');

db.User
.find({})
.populate('_meet')
.exec(function (err, users) {
  if(err) { return console.log("ERROR: ", err);}
  console.log("Created", users.length, " users");
  console.log("All user: \n", users);
  process.exit();
});
