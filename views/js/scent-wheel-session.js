$(document).ready(function() {  
  $('#end-button').click(function() {
    endSession();
  })
})
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
var setDir = function(dir, button){
	direction = dir;
	if (position != null) {
		$("#beginsession").prop("disabled",false);
	}
	$(button).removeClass("btn-default").addClass("btn-primary");
}

var setPos = function(pos, button){
	position = pos;
	if (direction != null) {
		$("#beginsession").prop("disabled",false);
	}
	console.log($(button));
	$(button).removeClass("btn-default").addClass("btn-primary");
}

var reset = function() {
	trial = "";
	direction = null;
	position = null;

	success = false;
	tempFalseCount = 0;
}

var init = function() {
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
var recordSuccess = function() {
	success=true;
}

var recordFalse = function() {
	tempFalseCount++;
}

var completeArm = function() {
	if (position == 3) {
		trial+=(success)?'S':'M';
		success = false;
	} else {
		trial+=tempFalseCount;
		tempFalseCount = 0;
	}
}

var move = function(dir) {
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

var updateDirection = function() {
	if (direction == 'c') {
		$('#current_direction').html("<h3>clockwise</h3>");
	} else {
		$('#current_direction').html("<h3>counterclockwise</h3>");
	}
}

var updatePosition = function() {
	$('.arm button:enabled').prop('disabled',true);
	$('#'+position).prop('disabled',false);
}

var newTrial = function() {
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
var endSession = function() { 

	if (position != null) { 
		completeArm(); 
		session += trial;
	}

	var endTime = new Date().getTime();

	var milliseconds = endTime - startTime;
	var seconds = Math.floor((milliseconds / 1000) % 60);
	var minutes = Math.floor((milliseconds / (1000*60)) % 60);
	var duration = minutes + " mins, " + seconds + " secs";
	
	var notes = document.getElementById("notes").value;
	
	var url = '/addwheelsessionstats';

	var dogName = $('#dog_name').html();
	var sessionId =  $('#id').val();
	var results = { "sessionId": sessionId,
									"duration": duration,
									"session_string": session,
									"notes": notes };
	
	$.post(url, results, function(data, status) {
    if (status == 'success') {
    	var redirect = '/scentwheelsessionsummary?id='+sessionId +'&dogName=' + dogName;
      window.location.replace(redirect);
    }
    else {
      alert('Failed to store session results. Please try again!');
    }
  })
}
