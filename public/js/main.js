// login.js is for index.html

$(document).ready(function() {
  console.log('main.js loaded!');

  var sourceMsg = $("#msg-template").html();
  var templateMsg = Handlebars.compile(sourceMsg);
  var sourceMeet = $("#meet-template").html();
  var templateMeet = Handlebars.compile(sourceMeet);

  $.get('/api/msg', function (msgs) {
    var msgHtml = templateMsg(msgs);
    $('#msg-list').append(msgHtml);
  });



  $('#msg-list')
    .on('click', '.edit', function handleEdit(event) {
      var msgId = $(this).parents('.msg').data('msg-id');
      var msgDiv = '[data-msg-id="'+ msgId + '"]';
      var $msgBox = $(msgDiv + ' .msg-box');
      $msgBox.replaceWith('<textarea class="edit-box" rows="4">'+ $msgBox.text() +'</textarea>');
      $(this).text("Save Edit");
      $(this).addClass("edit-save").removeClass("edit");
    })

    .on('click', '.edit-save', function handleSaveEdit(event) {
      var msgId = $(this).parents('.msg').data('msg-id');
      var msgDiv = '[data-msg-id="'+ msgId + '"]';
      var $saveBox = $(msgDiv + ' .edit-box');
      var url = '/api/msg/' + msgId;
      $.ajax({
        method: 'PUT',
        url: url,
        data: {msgText: $saveBox.val()},
        success: function (response) {
          $saveBox.replaceWith('<p class="msg-box" rows="5">'+ response.msgText +'</p>');
        }
      });
      $(this).text("Edit Message");
      $(this).addClass("edit").removeClass("edit-save");
    })

    .on('click', '.delete-msg', function handleDelete(event) {
      var msgId = $(this).parents('.msg').data('msg-id');
      var msgDiv = '[data-msg-id="'+ msgId + '"]';
      var url = '/api/msg/' + msgId;
      console.log("delete on!");
      $.ajax({
        method: 'DELETE',
        url: url,
        success: function (response) {
          $(msgDiv).fadeOut();
          setTimeout(function() {$(msgDiv).remove();}, 400);
        }
      });
    });


  $.get('/api/meet', function (meets) {
    var meetHtml = templateMeet(meets);
    $('#meet-list').append(meetHtml);
  });


  $('#save-meet').on('click', function handleMeet(event) {
    var meetData = {postText: $('meet-textarea').val()};
    $.post('/api/meet', meetData, function (response) {
      console.log(response); //TODO
    });
  });

  $('#meet-list').on('click', '.comment', function handleEdit(event) {
      var meetId = $(this).parents('.meet').data('meet-id');
      var meetDiv = '[data-meet-id="'+ meetId + '"]';
      var meetData = $(meetDiv + ' .comment-input').val();
      var url = '/api/meet/' + meetId;
      // console.log(meetId);
      $.ajax({
        method: 'PUT',
        url: url,
        data: meetData,
        success: function (response) {
          $(meetDiv + ' .meet-comment-box').append('<p>' + meetData.postText + '</p>');
          $(this).val("");
        }
      });

    });


});
