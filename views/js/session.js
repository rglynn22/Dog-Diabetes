//var sessionModel = require('./model/sessionModel.js') 
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
	//call storeSessionResults;
	window.location = 'dog-menu.ejs';
}
