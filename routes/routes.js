var sessionDB = require('../model/sessionModel.js');
var scentWheelDB = require('../model/scentWheelModel.js');
var dogDB = require('../model/dogModel.js');

/*********************************************
  Callbacks for GET requests
 *********************************************/

// Handler for main / home page
var getMain = function(req, res) {
  // change dogs to pull from backend
  dogDB.getAllDogs(function(result, err) {
    if (err) {
      res.send(500);
    }
    else {
      // console.log(result);      
      res.render('index.ejs', {results: result});
    }
  }) 
}

var getNewDogForm = function(req, res) {
  res.render('add-dog.ejs');
}

// Handler for dog information page
var getDogInfo = function(req, res) {
  var dogID = req.query.id;
  var dogName = req.query.dogName;
  

  sessionDB.getSessionsByDogId(dogID, function(data, err) {
    if (err) {
      console.log(err);
    }
    else {
	  var canister_sessions = [];
      for (var i = 0; i < data.length; i++) {
        var date = new Date(data[i].record_date);
        var dateString = date.toLocaleDateString("en-US")+
                         " @ "+
                         date.toLocaleTimeString("en-US");
        canister_sessions.push({ date: dateString, 
                                 sessionId: data[i].id });
      }
	  scentWheelDB.getSessionsByDogId(dogID, function(data2, err) {
	    if (err) {
	      console.log(err);
	    } else {
			var wheel_sessions = [];
	        for (var i = 0; i < data2.length; i++) {
            var date = new Date(data2[i].record_date);
            var dateString = date.toLocaleDateString("en-US")+
                             " @ " +
                             date.toLocaleTimeString("en-US");
	          wheel_sessions.push({ date: dateString, 
	                              sessionId: data2[i].id});
	    	}
          	// console.log(wheel_sessions);
  			//var result = canister_sessions.concat(wheel_sessions);
  			res.render('dog-menu.ejs', {dogName: dogName, 
            					  		        canisterSessions: canister_sessions,
							  		  	            wheelSessions: wheel_sessions,
                              		  dogID: dogID});
		}
	  })
    }
  })
} 

/*********************************************
  GET Requests for Canister Sessions
 *********************************************/

// Handler for new training session page
var getCanisterSessionForm = function(req, res) {
  // var dog = "Skip";
  var dogName = req.query.dogName;
  var dogID = req.query.dogID;
  res.render('new-session.ejs', {dogID: dogID, dogName: dogName});
}

// Handler for displaying canister session page
var getCanisterSession = function(req, res) {
  var id = req.query.id;
  var dogName = req.query.dogName;
  res.render('canister-session.ejs', {id: id, dogName: dogName});
}

// Handler for displaying session summary page
//TODO get scent wheel session summary
var getSessionSummary = function(req, res) {
  var sessionId = req.query.id;
  var dogName = req.query.dogName;

  sessionDB.getSessionById(sessionId, function(result, err){
    if (err) {
      res.send(500);
    }
    else {
      // console.log(result);
      var composite_time = new Date(result.record_date);

      var sessionSummary = {
        dog: dogName, // add
        sessionID: sessionId,
        date: composite_time.toLocaleDateString("en-US"), // add
        time: composite_time.toLocaleTimeString("en-US"), // add
		    location: result.location,
        canister: result.canister,
        handler: result.handler,
        sample_num: result.sample_number,
        sample_info: result.sample_info,
        sample_time: result.sample_time,
      }

      var sessionStats = {
        duration: result.duration || 0,
        trials: result.total_trials || 0,
        success: result.successes || 0,
        miss: result.misses || 0,
        false_alert: result.false_alerts || 0,
        notes: result.notes || "None"
      }
      res.render('session-summary.ejs', {summary: sessionSummary, stats: sessionStats});
    }
  })  
}

/*********************************************
  GET Requests for Scent Wheel Sessions
 *********************************************/

// Handler for displaying scent wheel session page
var getScentWheelSession = function(req, res) {
  var id = req.query.id;
  var dogName = req.query.dogName;
  var position = 2;
  var direction = "clockwise";
  res.render('scent-wheel-session.ejs', {id: id, 
                                         dogName: dogName, 
                                         position: position, 
                                         direction: direction});
}

var getScentWheelSessionForm = function(req, res) {
  var dogID = req.query.dogID;
  var dogName = req.query.dogName;
  res.render('new-scent-wheel-session.ejs', {dogID: dogID, dogName: dogName});
}

var getScentWheelSessionSummary = function(req, res) {
	
  var sessionId = req.query.id;
  var dogName = req.query.dogName;


  scentWheelDB.getSessionById(sessionId, function(result, err){
    if (err) {
      res.send(500);
    }
    else {
      var composite_time = new Date(result.record_date);

      var sessionSummary = {
        dog: dogName, // add
        sessionID: sessionId,
        date: composite_time.toLocaleDateString(), // add
        time: composite_time.toLocaleTimeString(), // add
		    location: result.location,
        handler: result.handler,
        sample_num: result.sample_number,
        sample_info: result.sample_info,
        sample_time: result.sample_time,
		    can1_contents: result.can1,
		    can2_contents: result.can2,
		    can3_contents: result.can3,
		    can4_contents: result.can4
      }
      var sessionStats = {
        duration: result.duration || 0,
        session_string: result.session_string || 
                "c,1,3 c,2,0 c,3,M/cc,4,0 c,3,S/cc,2,2 cc,1,0 cc,4,1 cc,3,S",
        notes: result.notes || "None"
      }

      // var sessionSummary = {
      //   dog: "Spot", // add
      //   sessionID: "200",
      //   date: "March 23", // add
      //   time: "3:36", // add
      //   location: "Philly",
      //   handler: "Joe",
      //   sample_num: 69,
      //   sample_info: "n/a",
      //   sample_time: "10:31pm",
      //   can1_contents: "gum",
      //   can2_contents: "gum",
      //   can3_contents: "sample",
      //   can4_contents: "gum"
      // }

      // var sessionStats = {
      //   duration: 0,
      //   session_string: "c,1,3 c,2,0 c,3,M/cc,4,0 c,3,S/cc,2,2 cc,1,0 cc,4,1 cc,3,S",
      //   notes: "None"
      // }
      
      res.render('scent-wheel-session-summary.ejs', {summary: sessionSummary, stats: sessionStats});
    }
  })
}

/*********************************************
  Callbacks for POST requests
 *********************************************/
var postAddDog = function(req, res) {
  var formData = {};
  formData.id = req.body.uuid;
  formData.name = req.body.name;
  formData.age = req.body.age;
  formData.date = req.body.date;
  formData.breed = req.body.breed;

  dogDB.addDog(formData, function(data, err) {
    if (err) {
      res.send(500);
    }
    else {
      res.send(data);
    }
  })
}

// Handler to add new training session to database
var postAddTrainingSession = function(req, res) {
  var formData = {};
  formData.sessionID = req.body.uuid;
  formData.dogID = req.body.dogID;
  formData.location = req.body.location;
  formData.canister = req.body.canister;
  formData.handler = req.body.handler;
  formData.sample_num = req.body.sample_num;
  formData.sample_info = req.body.sample_info;
  formData.sample_time = req.body.sample_time;
    
  sessionDB.addTrainingSession(formData, function(data, err) {
    if (err) {
      res.send(500);
    }
    else {
      res.send(data);
    }
  })    
}
 
var postSessionResults = function(req, res) {
  var data = {};
  data.sessionId = req.body.sessionId;
  data.successes = req.body.successes;
  data.misses = req.body.misses;
  data.false_alerts = req.body.false_alerts;
  data.total_trials = req.body.total_trials;  
  data.duration = req.body.duration;
  data.notes = req.body.notes;
	
  sessionDB.updateTrainingSession(data, function(result, err) {
    if (err) {
      res.send(500);
    }
    else {
      res.send(data);
    }
  })    
 }
 
var postWheelSessionResults = function(req, res) {
  var data = {};
  data.sessionId = req.body.sessionId;
  data.session_string = req.body.session_string;
  data.duration = req.body.duration;
  data.notes = req.body.notes;
  
  scentWheelDB.updateSession(data, function(result, err) {
    if (err) {
      res.send(500);
    }
    else {
      res.send(data);
    }
  })    
 }
  
var postAddScentWheelSession = function(req, res) {
  var data = {};
  data.sessionId = req.body.uuid;
  data.dogID = req.body.dogID;
  data.handler = req.body.handler;
  data.sample_num = req.body.sample_num;
  data.sample_info = req.body.sample_info;
  data.sample_time = req.body.sample_time;
  data.can1 = req.body.can1_contents;
  data.can2 = req.body.can2_contents;
  data.can3 = req.body.can3_contents;
  data.can4 = req.body.can4_contents;
  
  scentWheelDB.addSession(data, function(result, err) {
    if (err) {
      res.send(500);
    }
    else {
      res.send(result);
    }
  })  

 }

// Expose call backs to app controller
var routes = {
  // page rend routes
  get_main: getMain,
  get_dog_info: getDogInfo,
  get_canister_session_form: getCanisterSessionForm,
  get_scent_wheel_session_form: getScentWheelSessionForm,
  get_canister_session: getCanisterSession,
  get_scent_wheel_session: getScentWheelSession,
  get_session_summary: getSessionSummary,
  get_scent_wheel_session_summary: getScentWheelSessionSummary,
  get_new_dog_form: getNewDogForm,
  post_add_training_session: postAddTrainingSession,
	post_add_session_stats: postSessionResults,
  post_add_dog: postAddDog,
	post_add_wheel_session: postAddScentWheelSession,
	post_add_wheel_session_stats: postWheelSessionResults	
};

module.exports = routes;
