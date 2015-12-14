// login.js is for index.html

$(document).ready(function() {
  console.log('main.js loaded!');

  var source = $("#msg-template").html();
  var template = Handlebars.compile(source);
  var userId = "566dfec4aa613b470a202b76"; //TODO: get from the authorisation!!!

  $.get('/api/'+userId+'/msg', function (msgs) {
    var msgHtml = template(msgs);
    $('#msg-list').html(msgHtml);
  });



  $('#msg-list')
    .on('click', '.delete', function handleDelete(event) {
      var msgId = $(this).parents('.msg').data('msg-id');
      var url = '/api/' + userId + '/msg/' + msgId;
      $.ajax({
        method: 'DELETE',
        url: url,
        success: function (response) {
          $(this).parents('.msg').remove();
        }
      });
    })

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
      var url = '/api/' + userId + '/msg/' + msgId;
      $.ajax({
        method: 'PUT',
        url: url,
        data: {msgText: $saveBox.val()},
        success: function (response) {
          $saveBox.replaceWith('<p class="msg-box" rows="5">'+ response.msgText +'</p>');
        }
      });
      $(this).text("Edit Massage");
      $(this).addClass("edit").removeClass("edit-save");
    })

    .on('click', '.delete-msg', function handleDelete(event) {
      var msgId = $(this).parents('.msg').data('msg-id');
      var msgDiv = '[data-msg-id="'+ msgId + '"]';
      var url = '/api/' + userId + '/msg/' + msgId;
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

  $('#msg-list').on('click', '#new-msg', function handleNew(event) {
    window.location.href = '/new'; //TODO!!!
  });



});
