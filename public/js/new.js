// login.js is for index.html

$(function() {
  console.log('new.js loaded!');

  var source = $('#msg-template').html();
  var template = Handlebars.compile(source);

  $('#msg-form').on('submit', function handleFrom(event) {
    event.preventDefault();
    var newMsg = $('#msg-form').serialize();
    $.post('/api/msg', newMsg, function (msgs) {
      console.log(msgs);
      if(msgs.exMsg) {
        // window.location.href = '/match';
        var msgHtml = template(msgs.exMsg);
        $('#match-section').append(msgHtml);
        $('#msg-section').fadeOut();
        setTimeout(function() { $('#match-section').fadeIn() ;}, 400);
      } else {
        // window.location.href = '/main';
        $('#msg-section').fadeOut();
        setTimeout(function() { $('#wait-section').fadeIn() ;}, 400);
      }
    });
  });

  function renderExMsg(exMsg) {
    var msgHtml = template(exMsg);

  }


});
