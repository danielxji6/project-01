// login.js is for index.html

$(function() {
  console.log('new.js loaded!');

  var source = $('#msg-template').html();
  var template = Handlebars.compile(source);

  Handlebars.registerHelper('formatDate', function(date) {
    return date.slice(0, 10);
  });

  $('#msg-form').on('submit', function handleFrom(event) {
    event.preventDefault();
    var newMsg = $('#msg-form').serialize();
    $.post('/api/msg', newMsg, function (msgs) {
      console.log(msgs);
      if(msgs.duplicate) {
        $('#dupNumber').show();
      } else if(msgs.exMsg) {
        var msgHtml = template(msgs.exMsg);
        $('#match-section').append(msgHtml);
        $('#msg-section').fadeOut();
        setTimeout(function() { $('#match-section').fadeIn();}, 400);
      } else {
        $('#msg-section').fadeOut();
        setTimeout(function() { $('#wait-section').fadeIn();}, 400);
      }
    });
  });

  function renderExMsg(exMsg) {
    var msgHtml = template(exMsg);

  }


});
