// login.js is for index.html

$(function() {
  console.log('new.js loaded!');

  $('#msg-form').on('submit', function handleFrom(event) {
    event.preventDefault();
    var newMsg = $('#msg-form').serialize();
    $.post('/api/msg', newMsg, function (msgs) {
      console.log(msgs);
      // if(msgs.exMsg) {
      //   window.location.href = '/match';
      // } else {
      //   window.location.href = '/main';
      // }
    });
  });


});
