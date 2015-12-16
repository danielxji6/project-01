// login.js is for index.html

$(document).ready(function() {
  console.log('login.js loaded!');

  $('#signup-form').on('submit', function handleSignup (event) {
    event.preventDefault();
    var data = $('#signup-form').serialize();
    $.post('/signup', data, function (response) {
      window.location.href = '/main';
    });
  });

  $('#login-form').on('submit', function handleLogin (event) {
    event.preventDefault();
    var data = $('#login-form').serialize();
    $.post('/login', data)
    .success(function (response) {
      window.location.href = '/main';
    })
    .error(function (err) {
      console.log(err);
      $('#wrongUser').show();
    });

  });


});
