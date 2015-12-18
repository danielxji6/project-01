// login.js is for index.html

$(document).ready(function() {
  console.log('main.js loaded!');

  var sourceMsg = $("#msg-template").html();
  var templateMsg = Handlebars.compile(sourceMsg);
  var sourceMeet = $("#meet-template").html();
  var templateMeet = Handlebars.compile(sourceMeet);

  // list user messages
  $.get('/api/msg', function (msgs) {
    var msgHtml = templateMsg(msgs);
    $('#msg-list').append(msgHtml);
  });

  // list meet stories
  $.get('/api/meet', function (meets) {
    var meetHtml = templateMeet(meets);
    $('#meet-list').append(meetHtml);
  });

  $('#page-main').on('click', function handlePage(event) {
    $('#msg-list').show();
    $('#meet-list').hide();
  });

  $('#page-meet').on('click', function handlePage(event) {
    $('#msg-list').hide();
    $('#meet-list').show();
  });

  // Messages functions: Edit, Delete
  $('#msg-list')
  .on('click', '.edit', function handleEdit(event) {
    var msgId = $(this).parents('.msg').data('msg-id');
    var msgDiv = '[data-msg-id="'+ msgId + '"]';
    var $msgBox = $(msgDiv + ' .msg-box');
    $msgBox.replaceWith('<textarea class="edit-box" rows="4">'+ $msgBox.text() +'</textarea><br>');
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


  // Save user meet story
  $('#save-meet').on('click', function handleMeet(event) {
    var meetData = {postText: $('#meet-textarea').val()};
    // console.log(meetData);
    $.post('/api/meet', meetData, function (meet) {
      $('#meet-send').hide();
      $('#meet-user').html(
        '<h4>Your Story</h4>' +
        '<div id="meet-text" data-meet-id="' + meet._id + '">' +
         '<p class="meet-box">' + meet.postText + '</p>' +
         '<button class="btn btn-default edit-meet">Edit Story</button>' +
         '<button class="btn btn-default delete-meet">Delete Story</button>' +
        '</div>'
      );
    });
  });

  // Set user story
  var userMeetId = $('#meet-text').data('meet-id');
  if(userMeetId) {
    $.get('/api/meet/'+userMeetId, function (meet) {
      $('#meet-text').prepend('<p class="meet-box">' + meet.postText + '</p>');
    });
  }

  // Edit user meet story
  $('#meet-user')
  .on('click', '.edit-meet', function handleEdit(event) {
    var $meetBox = $('#meet-user .meet-box');
    $meetBox.replaceWith('<textarea class="edit-box" rows="4">'+ $meetBox.text() +'</textarea><br>');
    $(this).text("Save Edit");
    $(this).addClass("edit-save").removeClass("edit-meet");
  })

  .on('click', '.edit-save', function handleSaveEdit(event) {
    var meetId = $('#meet-text').data('meet-id');
    var $saveBox = $('#meet-user .edit-box');
    var url = '/api/meet/' + meetId;
    $.ajax({
      method: 'PUT',
      url: url,
      data: {postText: $saveBox.val()},
      success: function (meet) {
        $saveBox.replaceWith('<p class="meet-box">'+ meet.postText +'</p>');
      }
    });
    $(this).text("Edit Message");
    $(this).addClass("edit-meet").removeClass("edit-save");
  })

  .on('click', '.delete-meet', function handleDelete(event) {
    var meetId = $('#meet-text').data('meet-id');
    var url = '/api/meet/' + meetId;
    $.ajax({
      method: 'DELETE',
      url: url,
      success: function (response) {
        console.log(response);
        $('#meet-user').fadeOut();
      }
    });
  });

  $('#meet-list').on('click', '.comment', function handleEdit(event) {
      var meetId = $(this).parents('.meet').data('meet-id');
      var meetDiv = '[data-meet-id="'+ meetId + '"]';
      var meetData = {comment: $(meetDiv + ' .comment-input').val()};
      var url = '/api/meet/' + meetId;
      $.ajax({
        method: 'PUT',
        url: url,
        data: meetData,
        success: function (response) {
          $(meetDiv + ' .meet-comment-box').append('<p>' + meetData.comment + '</p>');
        }
      });
      $('.comment-input').val('');
    });


});
