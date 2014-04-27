var sessionDB = require('../model/sessionModel.js');
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
  res.render('canister-session.ejs', {id: id});
}

// Handler for displaying scent wheel session page
var getScentWheelSession = function(req, res) {
  var id = req.query.id;
  res.render('scent-wheel-session.ejs', {id: id});
}

var getScentWheelSessionForm = function(req, res) {
  var dogID = req.query.dogID;
  var dogName = req.query.dogName;
  res.render('new-scent-wheel-session.ejs', {dogID: dogID, dogName: dogName});
}

// Handler for displaying session summary page
var getSessionSummary = function(req, res) {
  var sessionId = req.body.id;
  var dogName = req.body.dogName;

  sessionDB.getSessionById(sessionId, function(result, err){
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
  // var sessionSummary = {
  //   dog: "Skip", // add
  //   sessionID: "1",
  //   date: "3/10/14", // add
  //   time: "12:00 PM", // add
  //   location: "Training center",
  //   canister: "Hip",
  //   handler: "Mike",
  //   sample_num: "#578",
  //   sample_info: "Used 10 times.",
  //   sample_time: "9:00 PM"
  // }
  // var sessionStats = {
  //   duration: "15 minutes",
  //   trials: "7",
  //   success: "3",
  //   miss: "2",
  //   false_alert: "2",
  //   notes: "Seemed distracted."
  // }
  
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
      var result = [];
      for (var i = 0; i < data.length; i++) {
        result.push({date: data[i].record_date, sessionId: data[i].id});
      }
      res.render('dog-menu.ejs', {dogName: dogName, 
                                  sessions: result,
                                  dogID: dogID});
    }
  })  
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
  })
}

// Handler to get a single training session for a particular dog
var getTrainingSession = function(req, res) {
  var sessionID = req.query.uuid;
  db.getTrainingSession(sessionID, function(data, err){
    if (err) {
      res.send(500);
    }
    else {
      res.send(data);
    }
  })
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
  formData.duration = req.body.duration;

  sessionDB.addTrainingSession(formData, function(data, err) {
    if (err) {
      res.send(500);
    }
    else {
      res.send(data);
    }
  })    
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
  })
}
 
// BUGGY
var postSessionResults = function(req, res) {
  //NEED TO ACCESS SESSION ID
  var data = {};
  data.sessionId = req.body.sessionId;
  data.successes = req.body.s;
  data.misses = req.body.m;
  data.false_alerts = req.body.f;
  data.total_trials = req.body.t;  
  data.duration = req.body.d;
	
  sessionDB.updateTrainingSession(data, function(result, err) {
    if (err) {
      res.send(500);
    }
    else {
      res.send(data);
    }
  })    
 }

// TODO: Data format not clear
 var postAddScentWheelSession = function(req, res) {
  var data = {};
  data.handler = req.body.handler;
  data.location = req.body.location;

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
    get_new_dog_form: getNewDogForm,
    get_all_dogs: getAllDogs,
    post_add_training_session: postAddTrainingSession,
    post_add_dog: postAddDog,
	
};

module.exports = routes;
