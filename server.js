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

app.get('/wait', function wait_page (req, res) {
  res.sendFile(__dirname + '/views/wait.html');
});

app.get('/match', function match_page (req, res) {
  res.sendFile(__dirname + '/views/match.html');
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

app.get('/api/user', function match_page (req, res) {});
app.post('/api/user', function match_page (req, res) {});
app.put('/api/user', function match_page (req, res) {});
app.delete('/api/user', function match_page (req, res) {});
app.get('/api/msg', function match_page (req, res) {});
app.post('/api/msg', function match_page (req, res) {});
app.put('/api/msg', function match_page (req, res) {});
app.delete('/api/msg', function match_page (req, res) {});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
