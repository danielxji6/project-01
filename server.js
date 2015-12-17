// SEVER-SIDE JAVASCRIPT

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    hbs = require('hbs'),
    sendmail = require('sendmail')(),
    text = require('textbelt'),
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

// set view engine to hbs and serve partials folder
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// Set file open ??
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'kpoprock',
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
  // if user already logged in redirect to main page
  if (req.user) {
    res.render('main', { user: req.user });
  } else {
    res.render('login');
  }
});

app.get('/main', function home_page (req, res) {
  // if user not logged in redirect back to login page
  if (req.user) {
    res.render('main', { user: req.user });
  } else {
    res.redirect('/');
  }
});

app.get('/new', function new_msg_page (req, res) {
  if (req.user) {
    res.render('new');
  } else {
    res.redirect('/');
  }
});

app.get('/match', function match_page (req, res) {
  if (req.user) {
    res.render('match');
  } else {
    res.redirect('/');
  }
});

app.get('/profile', function profile_page (req, res) {
  if (req.user) {
    res.render('profile', req.user);
  } else {
    res.redirect('/');
  }
});

app.get('/meet', function meet_page (req, res) {
  if (req.user) {
    res.render('meet');
  } else {
    res.redirect('/');
  }
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
    db.User.register(new db.User({ username: req.body.username, phoneNum: req.body.phoneNum, remindText: true }), req.body.password,
      function (err, newUser) {
        passport.authenticate('local')(req, res, function () {
          res.send('User Created!');
        });
      }
    );
  }
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  res.send('Logged in');
});

// log out user
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.put('/api/user', function api_delete_user (req, res) {
  var userId = req.user._id;
  var data = req.body;
  console.log(req.user);
  console.log(data);
  db.User.findOne({_id: userId}, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    user.phoneNum = data.phoneNum;
    user.location = data.location;
    user.remindText = (data.remindText === 'on' ? true : false);
    user.save(function (err, savedUser) {
      res.send('User saved!');
    });
  });
});

app.delete('/api/user', function api_delete_user (req, res) {
  var userId = req.user._id;
  db.User.remove({_id: userId}, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    res.json(user);
  });
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


app.get('/api/msg', function api_msg (req, res) {
  var userId = req.user._id;
  db.User.findById(userId, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    res.json({msg: user.msg});
  });
});

app.post('/api/msg', function api_create_msg (req, res) {
  var userId = req.user._id;
  var newMsg = req.body;
  var resData = {};
  newMsg.date = new Date();
  newMsg.match = false;
  db.User.findOne({phoneNum: newMsg.toNum}, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    if(user){
      user.msg.forEach(function (ele, index) {
        if(ele.toNum == req.user.phoneNum && !ele.match) {
          ele.match = true;
          user.save(function (err, savedUser) {
            if(err) { return console.log("ERROR: ", err);}
            sendTextMsg(userNum, user.phoneNum, ele.msgText);
          });
          newMsg.match = true;
          resData.exMsg = ele;
        }
      });
    }
  });
  db.User.findById(userId, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    user.msg.push(newMsg);
    user.save(function (err, savedUser) {
      if(err) { return console.log("ERROR: ", err);}
      resData.newMsg = user.msg[user.msg.length-1];
      res.json(resData);
    });
  });
});

app.put('/api/msg/:msgId', function api_edit_msg (req, res) {
  var userId = req.user._id;
  var msgId = req.params.msgId;
  var msgData = req.body;
  db.User.findById(userId, function (err, user) {
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
  var userId = req.user._id;
  var msgId = req.params.msgId;
  db.User.findById(userId, function (err, user) {
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

app.get('/api/meet', function api_get_meet(req, res) {
  db.Meet.find({}, function (err, meets) {
    if(err) { return console.log("ERROR: ", err);}
    res.json({meets: meets});
  });
});

app.post('/api/meet', function api_get_meet(req, res) {
  var userId = req.user._id;
  var meetData = req.body;
  db.User.findById(userId, function (err, user) {
    if(err) { return console.log("ERROR: ", err);}
    meetData.date = new Date();
    meetData._user = user._id;
    meetData.comments = [];
    db.Meet.create(meetData, function (err, meet) {
      if(err) { return console.log("ERROR: ", err);}
      user._meet = meet._id;
      user.save(function (err, user) {
        if(err) { return console.log("ERROR: ", err);}
        res.json(meet);
      });
    });
  });
});

app.get('/api/meet/:id', function api_get_meet(req, res) {
  var id = req.params.id;
  db.Meet.findById(id, function (err, meet) {
    res.json(meet);
  });
});

app.put('/api/meet/:id', function api_get_meet(req, res) {
  var id = req.params.id;
  var data = req.body;
  db.Meet.findById(id, function (err, meet) {
    if(err) { return console.log("ERROR: ", err);}
    if (data.postText) meet.postText = data.postText;
    if (data.comment) meet.comments.push(data.comment);
    meet.save(function (err) {
      if(err) { return console.log("ERROR: ", err);}
      res.json(meet);
    });
  });
});

app.delete('/api/meet/:id', function api_get_meet(req, res) {
  var userId = req.user._id;
  var id = req.params.id;
  db.Meet.remove({_id: id}, function (err, meet) {
    if(err) { return console.log("ERROR: ", err);}
    db.User.findById(userId, function (err, user) {
      if(err) { return console.log("ERROR: ", err);}
      user._meet = undefined;
      user.save(function (err) {
        if(err) { return console.log("ERROR: ", err);}
        res.json(user);
      });
    });
  });
});


/**********
 * Function *
 **********/

 // Textbelt func
 var opts = {
   fromAddr: 'ex.talk@email.com',  // "from" address in received text
   fromName: 'ex.talk',            // "from" name in received text
   region:   'us',                 // region the receiving number is in: 'us', 'canada', 'intl'
   subject:  'Subject!'            // subject of the message
 };
 function sendTextMsg(fromNum, toNum, message) {
   opts.fromAddr = '#' + fromNum;
   text.sendText(toNum, message, opts, function (err) {
     if(err) { return console.log("ERROR: ", err);}
   });
 }
 // text.debug("Textbelt debug on!");
 sendTextMsg(1234567890, 6699003292, "Textbelt is on!");




/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
