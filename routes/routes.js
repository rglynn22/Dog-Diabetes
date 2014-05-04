var sessionDB = require('../model/sessionModel.js');
var scentWheelDB = require('../model/scentWheelModel.js');
var dogDB = require('../model/dogModel.js');
/*********************************************
  Callbacks for Page Loads
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
        date: composite_time.toDateString(), // add
        time: composite_time.toTimeString(), // add
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
  });
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
        date: composite_time.toDateString(), // add
        time: composite_time.toTimeString(), // add
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
      res.render('scent-wheel-session-summary.ejs', {summary: sessionSummary, stats: sessionStats});
    }
  });
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
        canister_sessions.push({ date: data[i].record_date, 
                                 sessionId: data[i].id });
      }
      scentWheelDB.getSessionsByDogId(dogID, function(data, err) {
        if (err) {
          console.log(err);
        } else {
          var wheel_sessions = [];
          for (var i = 0; i < data.length; i++) {
            wheel_sessions.push({ date: data[i].record_date, 
                                 sessionId: data[i].id});
          }
          // console.log(wheel_sessions);
          var result = canister_sessions.concat(wheel_sessions);
          res.render('dog-menu.ejs', {dogName: dogName, 
                                      sessions: result,
                                      dogID: dogID});
        }
      })      
    }
  }); 
}

/*********************************************
  Callbacks for GET requests
 *********************************************/

// Handler to get all dogs
var getAllDogs = function(req, res) {
  dogDB.getAllDogs(function(data, err) {
    if (err) {
      res.send(500);
    }
    else {
      res.send(data);
    }
  });
}

// Handler to get a single training session for a particular dog
//TODO get scent wheel sessions
var getTrainingSession = function(req, res) {
  var sessionID = req.query.uuid;
  db.getTrainingSession(sessionID, function(data, err){
    if (err) {
      res.send(500);
    }
    else {
      res.send(data);
    }
  });
}

var getNewDogForm = function(req, res) {
  res.render('add-dog.ejs');
}

/*********************************************
  Callbacks for POST requests
 *********************************************/


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
  })  ;  
}

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
  });
}
 
// BUGGY
var postSessionResults = function(req, res) {
  //NEED TO ACCESS SESSION ID
  var data = {};
  data.sessionId = req.body.sessionId;
  data.successes = req.body.successes;
  data.misses = req.body.misses;
  data.false_alerts = req.body.false_alerts;
  data.total_trials = req.body.total_trials;  
  data.duration = req.body.duration;
	
  sessionDB.updateTrainingSession(data, function(result, err) {
    if (err) {
      res.send(500);
    }
    else {
      res.send(data);
    }
  });
 }
 
// BUGGY
var postWheelSessionResults = function(req, res) {
  //NEED TO ACCESS SESSION ID
  var data = {};
  data.sessionId = req.body.sessionId;
  data.session_string = req.body.session_string;
  data.duration = req.body.duration;

  scentWheelDB.updateSession(data, function(result, err) {
    if (err) {
      res.send(500);
    }
    else {
      res.send(data);
    }
  });    
 }
  

// TODO: Data format not clear
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
  });

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
  get_all_dogs: getAllDogs,
  post_add_training_session: postAddTrainingSession,
	post_add_session_stats: postSessionResults,
  post_add_dog: postAddDog,
	post_add_wheel_session: postAddScentWheelSession,
	post_add_wheel_session_stats: postWheelSessionResults	
};

module.exports = routes;
