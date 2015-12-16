// login.js is for index.html

$(document).ready(function() {
  console.log('main.js loaded!');

  var source = $("#msg-template").html();
  var template = Handlebars.compile(source);

  $.get('/api/msg', function (msgs) {
    var msgHtml = template(msgs);
    $('#msg-list').html(msgHtml);
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




});
