// login.js is for index.html

$(document).ready(function() {
  console.log('main.js loaded!');

  var source = $("#msg-template").html();
  var template = Handlebars.compile(source);
  var userId = "566dfec4aa613b470a202b76"; //TODO: get from the authorisation!!!

  $.get('/api/'+userId+'/msg', function (msgs) {
    console.log(msgs);
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
        success: function (response) {
          console.log();
          $saveBox.replaceWith('<p class="msg-box" rows="5">'+ $saveBox.val() +'</p>');
          $(this).text("Edit Massage");
          $(this).addClass("edit").removeClass("edit-save");
        }
      });
    });

  $('#new-msg').on('click', function handleNew(event) {
    window.location.href = '/new-msg.html'; //TODO!!!
  });

});
