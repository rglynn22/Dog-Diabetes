$(document).ready(function() {
  $('#new-training-form').submit(function(event) {
    event.preventDefault();
    submitForm();
  })
})

var submitForm = function() {
  var url = '/addsession';
  var uuid = guid();
  $('input[name="uuid"]').val(uuid);
  $.post(url, $('#new-training-form').serialize(), function(data, status) {
    if (status == 'success') {
      window.location.replace('/scentwheelsession?id='+uuid);
    }
    else {
      alert('Failed to create new training session. Please try again!');
    }
  })
}