// SEVER-SIDE JAVASCRIPT

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    request = require('request'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require('./models');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/vendor'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function login_page (req, res) {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/main', function home_page (req, res) {
  res.sendFile(__dirname + '/views/main.html');
});

app.get('/new', function new_msg_page (req, res) {
  res.sendFile(__dirname + '/views/new.html');
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
 * Auth Endpoints
 */

// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  // if user is logged in, don't let them sign up again
  if (req.user) {
    res.redirect('/main');
  } else {
    db.User.register(new db.User({ username: req.body.username }), req.body.password,
      function (err, newUser) {
        passport.authenticate('local')(req, res, function () {
          res.redirect('/main');
        });
      }
    );
  }
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/main');
});

// log out user
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// show user profile page
app.get('/profile', function (req, res) {
  // only show profile if user is logged in
  if (req.user) {
    res.render('profile', { user: req.user });
  } else {
    res.redirect('/login');
  }
});

/*
 * JSON API Endpoints
 */


app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to my personal api!",
    documentation_url: "https://github.com/phnxdaniel/project-01",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

// app.get('/api/user/:name', function api_user (req, res) {
//   var name = req.params.name;
//   db.User.findOne({userName: name}, function (err, user) {
//     res.json(user);
//   });
// });
//
// app.post('/api/user', function api_create_user (req, res) {
//   var data = req.body;
//   db.User.create(data, function (err, user) {
//     res.json(user);
//   });
// });
//
// app.put('/api/user/:id', function api_edit_user (req, res) {
//   var id = req.params.id;
//   var data = req.body;
//   db.User.findOne({_id: id}, function (err, user) {
//     if(err) { return console.log("ERROR: ", err);}
//     user.userName = data.userName;
//     user.phoneNum = data.phoneNum;
//     user.location = data.location;
//     user.remindText = data.remindText;
//     user.save(function (err, savedUser) {
//       if(err) { return console.log("ERROR: ", err);}
//       res.json(savedUser);
//     });
//   });
// });

app.delete('/api/user/:id', function api_delete_user (req, res) {
  var userId = req.user._id;
  db.User.remove({_id: userId}, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    res.json(user);
  });
});

app.get('/api/msg', function api_msg (req, res) {
  var userId = req.user._id;
  db.User.findOne({_id: userId}, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    res.json({msg: user.msg});
  });
});

app.post('/api/msg', function api_create_msg (req, res) {
  var userId = req.user._id;
  var newMsg = req.body;
  db.User.findOne({_id: userId}, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    user.msg.push(newMsg);
    user.save(function (err, savedUser) {
      res.redirect('/main');
    });
  });
});

app.put('/api/msg/:msgId', function api_edit_msg (req, res) {
  var userId = req.user._id;
  var msgId = req.params.msgId;
  var msgData = req.body;
  db.User.findOne({_id: userId}, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    user.msg.forEach(function (ele, index) {
      if(ele._id == msgId) {
          ele.msgText = msgData.msgText;
          user.save(function (err, savedUser) {
          if(err) { return console.log("ERROR: ", err);}
          res.json(ele);
        });
      }
    });
  });
});

app.delete('/api/msg/:msgId', function api_delete_msg (req, res) {
  var userId = req.params.userId;
  var msgId = req.params.msgId;
  db.User.findOne({_id: userId}, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    user.msg.forEach(function (ele, index) {
      if(ele._id == msgId) {
          var deleteMsg = user.msg.splice(index, 1);
          user.save(function (err, savedUser) {
          if(err) { return console.log("ERROR: ", err);}
          res.json(deleteMsg);
        });
      }
    });
  });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
