// login.js is for index.html

$(function() {
  console.log('new.js loaded!');

  $('#msg-form').on('submit', function handleFrom(event) {
    event.preventDefault();
    var newMsg = $('#msg-form').serialize();
    var url = '/api/msg';
    $.post(url, newMsg, function (response) {
      window.location.href = '/main';
    });
  });


});
