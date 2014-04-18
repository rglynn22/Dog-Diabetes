$(document).ready(function() {
  $('#add-dog-form').submit(function(event) {
    event.preventDefault();
    submitForm();
  })
})

var submitForm = function() {
  var url = '/adddog';
  var uuid = guid();
  $('input[name="uuid"]').val(uuid);
  $('input[name="date"]').val((new Date()).toISOString());
  $.post(url, $('#add-dog-form').serialize(), function(data, status) {
    if (status == 'success') {
      window.location.replace('/doginfo?id='+uuid+'?name='+$('input[name="name"]').val());
    }
    else {
      alert('Failed to create add new dog. Please try again!');
    }
  })
}