// login.js is for index.html

$(function() {
  console.log('new.js loaded!');

  var userId = "566dfec4aa613b470a202b76"; //TODO: get from the authorisation!!!

  $('#msg-form').on('submit', function handleFrom(event) {
    event.preventDefault();
    var newMsg = $('#msg-form').serialize();
    console.log(newMsg);
  });


});