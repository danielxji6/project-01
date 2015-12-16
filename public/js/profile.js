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

  $('#delete')
    .on('click', '.delete-btn', function (event) {
      $(this).addClass("delete-bomb");
      $(this).text("Are you sure?");
    })

    .on('click', '.delete-bomb', function (event) {
      $.ajax({
        method: 'DELETE',
        url: '/api/user',
        success: function (response) {
          window.location.href = '/';
        }
      });
    });

});
