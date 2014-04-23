var successCount = 0;
var missCount = 0;
var falseCountArm1 = 0;
var falseCountArm2 = 0;
var falseCountArm4 = 0;
var trialCount = 0;
var direction = 1;

function recordSuccess() {
	successCount++;
	document.getElementById("success_tally").innerHTML = successCount + "";
	trialCount++;
	document.getElementById("arm_tally").innerHTML = trialCount + "";
}

function recordMiss() {
	missCount++;
	document.getElementById("miss_tally").innerHTML = missCount + "";
	trialCount++;
	document.getElementById("arm_tally").innerHTML = trialCount + ""; 
}

function recordFalseArm1() {
	falseCountArm1++;
	document.getElementById("arm1_false_tally").innerHTML = falseCountArm1 + "";
	trialCount++;
	document.getElementById("arm_tally").innerHTML = trialCount + "";
}

function recordFalseArm2() {
	falseCountArm2++;
	document.getElementById("arm2_false_tally").innerHTML = falseCountArm2 + "";
	trialCount++;
	document.getElementById("arm_tally").innerHTML = trialCount + "";
}

function recordFalseArm4() {
	falseCountArm4++;
	document.getElementById("arm4_false_tally").innerHTML = falseCountArm4 + "";
	trialCount++;
	document.getElementById("arm_tally").innerHTML = trialCount + "";
}

function changeDirClockwise() {
	direction = 0;
	this.disabled = 'disabled'; //grey out buttton after clicked
}

function changeDirCounterClockwise() {
	direction = 1;
	this.disabled = 'disabled'; //greay out button after clicked
}



function endSession() {
    //getelememnetbyiD to get session id
	var url = '/postsessionresults';
	var results = [ { "s":successCount, "m":missCount, "f1":falseCountArm1, "f2":falseCountArm2, "f4":falseCountArm4, "t":trialCount} ]
	
	$.post(url, results, function(data, status) {
      if (status == 'success') {
        window.location.replace('/getsessions?dogid='+uuid);
      }
      else {
        alert('Failed to store session results. Please try again!');
      }
    })
}
