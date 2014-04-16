$(document).ready(function() {
  $('#new-training-form').submit(function(event) {
    event.preventDefault();
    submitForm();
  })
})

var guid = function(){
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

var submitForm = function() {
  var url = '/addsession';
  var uuid = guid();
  $('input[name="uuid"]').val(uuid);
  $.post(url, $('#new-training-form').serialize(), function(data, status) {
    if (status == 'success') {
      window.location.replace('/session');
    }
    else {
      alert('Failed to create new training session. Please try again!');
    }
  })
}