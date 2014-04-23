var successCount = 0;
var missCount = 0;
var falseCount = 0;
var trialCount = 0;
var startTime = new Date().getTime();

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
	var endTime = new Date().getTime();
	//pull start time from DB?
	//how to get sessionID?
	var duration = endTime-startTime;
	var url = '/postsessionresults';
	var results = [ {"duration":duration,
		 			"successes":successCount, 
					"misses":missCount, 
					"false_alerts":falseCount, 
					"total_trials":trialCount} ];
	
	$.post(url, results, function(data, status) {
      if (status == 'success') {
        window.location.replace('/getsessions?dogid='+uuid);
      }
      else {
        alert('Failed to store session results. Please try again!');
      }
    })
}
