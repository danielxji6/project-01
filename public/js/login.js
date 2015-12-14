// login.js is for index.html

$(document).ready(function() {
  console.log('login.js loaded!');

  $('#signup-form').on('submit', function handleSignup (event) {
    event.preventDefault();
    var user = $('#signup-form').serialize();
    $.post('/api/user', user, function (response) {
      console.log("User Created!");
      //TODO: add authorisation
      window.location.href = '/main';
    });
  });

  $('#login-form').on('submit', function handleLogin (event) {
    event.preventDefault();
    var url =  '/api/user/' + $('#loginName').val();
    $.get(url, function (response) {
      console.log(response);
      if(response) {
        //TODO: add authorisation
        window.location.href = '/main';
      } else {
        $('#wrongUser').show();
      }
    });

  });


});
