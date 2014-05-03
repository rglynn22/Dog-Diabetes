$(document).ready(function() {
  $('#new-training-form').submit(function(event) {
    event.preventDefault();
    submitForm();
  })
})

var submitForm = function() {
  var url = '/addsession';
  //var uuid = guid();
  //var dogName = $('h2').val();
  $('input[name="uuid"]').val(uuid);
  
  $.post(url, $('#new-training-form').serialize(), function(data, status) {
    if (status == 'success') {
      window.location.replace('/canistersession?id=' + uuid +'&dogName=' + $('input[name="dogName"]').val());
    }
    else {
      alert('Failed to create new training session. Please try again!');
    }
  })
}