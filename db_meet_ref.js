// get all user list

var db = require('./models');

db.User.findOne({username: "ddd"}, function (err, user) {
  if(err) { return console.log("ERROR: ", err);}
  console.log(user);
  var meets = new db.Meet({
    _user: user._id,
    data: new Date(),
    postText: "Kpoppppppp",
    comments: ["oh", "me too"]
  });
  db.Meet.create(meets, function (err, meet) {
    if(err) { return console.log("ERROR: ", err);}
    user._meet = meet._id;
    // console.log(user.meet);
    user.save(function (err, user) {
      if(err) { return console.log("ERROR: ", err);}
      console.log(user);
    });
  });
});

db.Meet
.findById("5671f5194a198023111ae749")
.populate('_user')
.exec(function (err, meet) {
  if (err) return handleError(err);
  console.log(meet);
  // prints "The creator is Aaron"
});

// db.User.findOne({username: "ddd"}, function (err, user) {
//   if(err) { return console.log("ERROR: ", err);}
//   var meet = user.meet;
//
//   // console.log(user);
//   process.exit();
// });
