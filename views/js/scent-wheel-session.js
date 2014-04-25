// Component of trial string written: 
// <direction>,<position>,<data>
// ex: c,1,3 --> clockwise, arm 1, 3 falses
// ex: cc,3,S --> counterclockwise, arm 3, success

// Series of trial components space separated
// ex: c,1,3 c,2,0 c,3,M

var trial = "";

var direction;
var position;

var success = false;
var tempFalseCount = 0;

var falseCount = 0;
var trialCount = 0;

function init(dir, pos) {
	if (dir == "clockwise"){
		trial += 'c';
		direction = 'c';
	} else {
		trial += 'cc';
		direction = "cc";
	} 
	trial += ','+pos+',';
	position = pos;
	console.log(trial);
}

function recordSuccess() {
	success=true;
	trialCount++;
}

function recordFalse() {
	falseCount++;
	tempFalseCount++;
	trialCount++;
}

function move(dir) {
	// Record result from previous arm
	if (position == 3) {
		trial+=(success)?'S':'M';
		success = false;
	} else {
		trial+=tempFalseCount;
		tempFalseCount = 0;
	}
	console.log(trial);

	// Update direction
	trial+= ' '+dir;
	if (dir != direction) {
		direction = dir;
		updateDirection(); // page change
	}
	// Update position
	if (position == 4 && direction == 'c') { position = 1 }
	else if (position == 1 && direction == 'cc') { position = 4 }
	else {
		if (direction == 'c') position++;
		else position--;
	};
	trial+=','+position+',';
	updatePosition(); // page change
}

function updateDirection () {
	if (direction == 'c') {
		$('#current_direction').html("<h3>clockwise</h3>");
	} else {
		$('#current_direction').html("<h3>counterclockwise</h3>");
	}
}

function updatePosition () {
	$('.arm button:enabled').prop('disabled',true);
	$('#'+position).prop('disabled',false);
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
