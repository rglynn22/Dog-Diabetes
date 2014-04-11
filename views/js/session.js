var successCount = 0;
var missCount = 0;
var falseCount = 0;
var trialCount = 0;

function recordSuccess() {
	successCount++;
	document.getElementById("success_tally").innerHTML = successCount + "";
	trialCount++;
	document.getElementById("trial_tally").innerHTML = trialCount + "";
}

function recordMiss() {
	missCount++;
	document.getElementById("miss_tally").innerHTML = missCount + "";
	trialCount++;
	document.getElementById("trial_tally").innerHTML = trialCount + ""; 
}

function recordFalseAlert() {
	falseCount++;
	document.getElementById("false_tally").innerHTML = falseCount + "";
	trialCount++;
	document.getElementById("trial_tally").innerHTML = trialCount + "";
}

function endSession() {
    //getelememnetbyiD to get session id
	var url = '/postsessionresults';
	var results = [ { "s":successCount, "m":missCount, "f":falseCount, "t":trialCount} ]
	
	$.post(url, results, function(data, status) {
      if (status == 'success') {
        window.location.replace('/getsessions?dogid='+uuid);
      }
      else {
        alert('Failed to store session results. Please try again!');
      }
    })
}
