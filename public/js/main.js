// login.js is for index.html

$(document).ready(function() {
  console.log('main.js loaded!');

  $('#msg-list')
    .on('click', '.delete', function handleDelete(event) {
      var msgId = $(this).parents('.msg').data('msg-id');
      var userId = " "; //TODO: get author
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
      $msgBox.replaceWith('<textarea class="edit-box" rows="5">'+ $msgBox.text() +'</textarea>');
      $(this).text("Save Edit");
      $(this).addClass("edit-save").removeClass("edit");
    })

    .on('click', '.edit-save', function handleEdit(event) {
      var msgId = $(this).parents('.msg').data('msg-id');
      var msgDiv = '[data-msg-id='+ msgId + '] ';
      var userId = " "; //TODO: get from authorisation
      var url = '/api/' + userId + '/msg/' + msgId;
      // $(msgDiv + ' msg-box').replace('<textarea class="edit-box" rows="5">'+ response.msg +'</textarea>');
      $.ajax({
        method: 'PUT',
        url: url,
        success: function (response) {
          //TODO
        }
      });
    });

  $('#new-msg').on('click', function handleNew(event) {
    window.location.href = '/new-msg.html'; //TODO!!!
  });

});
