$(document).ready(function() { 
  $('textarea').autosize(); 
  $('#end-button').click(function(  ) {
    endSession();
  })
})

var successCount = 0;
var missCount = 0;
var falseCount = 0;
var trialCount = 0;
var startTime = new Date().getTime();

var recordSuccess = function() {
	successCount++;
	document.getElementById("success_tally").innerHTML = successCount + "";
	trialCount++;
	document.getElementById("trial_tally").innerHTML = trialCount + "";
}

var recordMiss = function() {
	missCount++;
	document.getElementById("miss_tally").innerHTML = missCount + "";
	trialCount++;
	document.getElementById("trial_tally").innerHTML = trialCount + ""; 
}

var recordFalseAlert = function() {
	falseCount++;
	document.getElementById("false_tally").innerHTML = falseCount + "";
	trialCount++;
	document.getElementById("trial_tally").innerHTML = trialCount + "";
}

var endSession = function() {
  	console.log("Ending session");
  	var endTime = new Date().getTime();
	var milliseconds = endTime - startTime;
	var seconds = Math.floor((milliseconds / 1000) % 60);
	var minutes = Math.floor((milliseconds / (1000*60)) % 60);
	var duration = minutes + " mins, " + seconds + " secs";
	var notes = document.getElementById("notes").value;
	
	var url = '/addsessionstats';
	var sessionId =  $('#id').val();

  	var results = { "sessionId": sessionId,
                    "duration": duration,
		 			"successes": successCount, 
					"misses": missCount, 
					"false_alerts": falseCount, 
					"total_trials": trialCount,
					"notes": notes };
	
	$.post(url, results, function(data, status) {
      if (status == 'success') {
        var redirect = '/sessionsummary?id='+sessionId +'&dogName=' + $('h2').html();
        window.location.replace(redirect);
      }
      else {
        alert('Failed to store session results. Please try again!');
      }
    })
}
