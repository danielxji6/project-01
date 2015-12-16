$(document).ready(function() {
  console.log('profile.js loaded!');

  $('#user-form').on('submit', function handleProfile(event) {
    event.preventDefault();
    var data = $('#user-form').serialize();
    console.log(data);
    $.ajax({
      method: 'put',
      url: '/api/user',
      data: data,
      success: function (response) {
        $('#saved-text').show();
      }
    });
  });

  $('#delete-btn').on('click', function handlePopout(event) {
    console.log($('#delete-modal'));
    $('#delete-modal').modal(show=true);
  });

  $('#delete-user').on('click', function habdleDelete(event) {
    $.ajax({
      method: 'DELETE',
      url: '/api/user',
      success: function (response) {
        window.location.href = '/';
      }
    });
  });
});
