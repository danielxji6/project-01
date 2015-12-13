// SEVER-SIDE JAVASCRIPT

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    request = require('request'),
    db = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function login_page (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/main', function home_page (req, res) {
  res.sendFile(__dirname + '/views/main.html');
});

app.get('/new', function new_msg_page (req, res) {
  res.sendFile(__dirname + '/views/new_msg.html');
});

app.get('/match', function match_page (req, res) {
  res.sendFile(__dirname + '/views/match.html');
});

app.get('/profile', function profile_page (req, res) {
  res.sendFile(__dirname + '/views/profile.html');
});

app.get('/meet', function meet_page (req, res) {
  res.sendFile(__dirname + '/views/meet.html');
});

/*
 * JSON API Endpoints
 */


app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to my personal api!",
    documentation_url: "https://github.com/phnxdaniel/ex.talk",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/user/:name', function api_user (req, res) {
  var name = req.params.name;
  db.User.findOne({userName: name}, function (err, user) {
    res.json(user);
  });
});

app.post('/api/user', function api_create_user (req, res) {
  var data = req.body;
  db.User.create(data, function (err, user) {
    res.json(user);
  });
});

app.put('/api/user/:id', function api_edit_user (req, res) {
  var id = req.params.id;
  var data = req.body;
  db.User.findOne({_id: id}, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    user.userName = data.userName;
    user.phoneNum = data.phoneNum;
    user.location = data.location;
    user.remindText = data.remindText;
    user.save(function (err, savedUser) {
      if(err) { return console.log("ERROR: ", err);}
      res.json(savedUser);
    });
  });
});

app.delete('/api/user/:id', function api_delete_user (req, res) {
  var id = req.params.id;
  db.User.remove({_id: id}, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    res.json(user);
  });
});

app.get('/api/:userId/msg', function api_msg (req, res) {
  var userId = req.params.userId;
  db.User.findOne({_id: userId}, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    res.json({msg: user.msg});
  });
});

app.post('/api/:userId/msg', function api_create_msg (req, res) {});

app.put('/api/:userId/msg/:msgId', function api_edit_msg (req, res) {});

app.delete('/api/:userId/msg/:msgId', function api_delete_msg (req, res) {});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
