// Component of trial string written: 
// <direction>,<position>,<data>
// ex: c,1,3 --> clockwise, arm 1, 3 falses
// ex: cc,3,S --> counterclockwise, arm 3, success

// Series of trial components space separated
// ex: c,1,3 c,2,0 c,3,M
var startTime = new Date().getTime();

// Series of trials / separated
// ex: c,1,3 c,2,0 c,3,M/c,1,3 c,2,0 c,3,M

var session = "";
var trial = "";

var direction = null;
var position = null;

var success = false;
var tempFalseCount = 0;

// Trial setup functions  
function setDir(dir){
	direction = dir;
	if (position != null) {
		$("#beginsession").prop("disabled",false);
	}
}

function setPos(pos){
	position = pos;
	if (direction != null) {
		$("#beginsession").prop("disabled",false);
	}
}

function reset() {
	trial = "";
	direction = null;
	position = null;

	success = false;
	tempFalseCount = 0;
}

function init() {
	if (direction == "c"){
		trial += 'c';
	} else {
		trial += 'cc';
	} 
	trial += ','+position+',';

	// Setup Page
	if (direction == "c") {
		$("#current_direction h3").html("clockwise");
	} else {
		$("#current_direction h3").html("counterclockwise");
	}

	$("#"+position).prop("disabled",false);

	$("#setup").hide();
	$("#trial").show();
}


// Trial functions
function recordSuccess() {
	success=true;
}

function recordFalse() {
	tempFalseCount++;
}

function completeArm() {
	if (position == 3) {
		trial+=(success)?'S':'M';
		success = false;
	} else {
		trial+=tempFalseCount;
		tempFalseCount = 0;
	}
}

function move(dir) {
	// Record result from previous arm
	completeArm();

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

	console.log(trial);
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

function newTrial() {
	completeArm();
	session += trial + "/";
	// reset the variables
	$("#"+position).prop('disabled',true);
	reset();
	// swap page
	$("#trial").hide();
	$("#setup").show();
	console.log(session);
}


// Database interaction functions
function endSession() {
	// Update session string
	completeArm();
	session += trial;

    var endTime = new Date().getTime();
	var milliseconds = endTime - startTime;
	var minutes = (milliseconds / (1000*60)) % 60;
	var url = '/addwheelsessionstats';
	var dogName = $('#dog_name').val();
	var results = [ { "duration":minutes, "session_string":session_string} ]
	
	$.post(url, results, function(data, status) {
      if (status == 'success') {
        window.location.replace('/scentwheelsessionsummary?id='+uuid +'&dogName=' + dogName);
      }
      else {
        alert('Failed to store session results. Please try again!');
      }
    })
}
