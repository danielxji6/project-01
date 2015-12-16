// Inital Date file

var db = require('./models');

// Data sheet
var userList = [];
userList.push({
  username: "test1",
  // password:
  phoneNum: 1231231234,
  location: "test1",
  msg: [],
  meet: {},
  remindText: true
});
userList.push({
  userName: "cryingpuppy",
  phoneNum: 1231231234,
  location: "SF, CA",
  msg: [],
  meet: {},
  remindText: true
});
userList.push({
  userName: "lifeisgood",
  phoneNum: 1231231234,
  location: "SF, CA",
  msg: [],
  meet: {},
  remindText: true
});

var sampleMsg = [];
sampleMsg.push({
  date: new Date(),
  toName: "Cindy",
  toNum: 3213214321,
  msgText: "I wish we can...",
  match: false
});
sampleMsg.push({
  date: new Date(),
  toName: "Min",
  toNum: 852741963232,
  msgText: "You are such a...",
  match: false
});

var sampleMeet = {
  date: new Date(),
  postText: "I used to have a girlfriend...",
  comments: ["Same feeling...", "I think..."]
};

userList.forEach(function (ele, index) {
  ele.msg = sampleMsg;
  ele.meet = sampleMeet;
});

  // ele.save(function (err) {
  //   if(err) { return console.log("ERROR: ", err);}
  //
  //   var story = new Meet(sampleMeet);
  //   story.save(function (err) {
  //     if(err) { return console.log("ERROR: ", err);}
  //   });
  // });
// db.User.remove({}, function (err) {
//   // db.User.create(userList, function (err, users) {
//   //   if(err) { return console.log("ERROR: ", err);}
//   //   console.log("Created", users.length, " users");
//   //   console.log("All user: \n", users);
//   //   process.exit();
//   // });
// });


db.User.find({}, function (err, users) {
  if(err) { return console.log("ERROR: ", err);}
  console.log("Created", users.length, " users");
  console.log("All user: \n", users);
  process.exit();
});
