var sessionDB = require('./model/sessionModel.js');
var dogDB = require('./model/dogModel.js');
/*********************************************
  Callbacks for Page Loads
 *********************************************/

/*********************************************
  Callbacks for Page Loads
 *********************************************/

// Handler for main / home page
var getMain = function(req, res) {
  // change dogs to pull from backend
  var dogs = [{name: "Skip"},{name: "Fluffy"}];

  res.render('index.ejs', {results: dogs});
}

// Handler for new training session page
var getNewTrainingSession = function(req, res) {
  var dog = "Skip";
  res.render('new-session.ejs',{name: dog});
}

// Handler for displaying session page
var getSession = function(req, res) {
  res.render('session.ejs');
  //res.post(req, postAddTrainingSession);
}

var getAllSessions = function(req, res) {
	res.render('dog-menu.ejs');
}

// TO DO
// // Handler for displaying page for adding dog
// var getAddDog = function(req, res) {
//   res.render('add-dog.ejs');
// }

// Handler for displaying session summary page
var getSessionSummary = function(req, res) {
    var sessionSummary = {
    dog: "Skip", // add
    sessionID: "1",
    date: "3/10/14", // add
    time: "12:00 PM", // add
    location: "Training center",
    canister: "Hip",
    handler: "Mike",
    sample_num: "#578",
    sample_info: "Used 10 times.",
    sample_time: "9:00 PM"
  }
  var sessionStats = {
    duration: "15 minutes",
    trials: "7",
    success: "3",
    miss: "2",
    false_alert: "2",
    notes: "Seemed distracted."
  }
  res.render('session-summary.ejs', {summary: sessionSummary, stats: sessionStats});
}

// Handler for dog information page
var getDogInfo = function(req, res) {
  var dog = req.param('dogname');

  // change data and dogs to pull info from db
  var data = [{date: "March 10, 2014", uuid:1}, {date: "February 29, 2014", uuid:2}];

  res.render('dog-menu.ejs', {name: dog, sessions: data});
}

/*********************************************
  Callbacks for GET requests
 *********************************************/

// Handler to get all dogs
var getAllDogs = function(req, res) {

}

// Part of loading Dog Info page
// // Handler to get info for a single dog
// var getDogInfo = function(req, res) {

// }

// Handler to get all training session for a particular dog?
var getAllTrainingSessions = function(req, res) {

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

/*********************************************
  Callbacks for POST requests
 *********************************************/

 // // Handler to add new dog to database
 // var postAddDog = function(req, res) {

 // }

// Handler to add new training session to database
 var postAddTrainingSession = function(req, res) {
  var formData = {};
  var db = require("./model/sessionModel.js")
  formData.sessionID = req.body.uuid;
  formData.location = req.body.location;
  formData.canister = req.body.canister;
  formData.handler = req.body.handler;
  formData.sample_num = req.body.sample_num;
  formData.sample_info = req.body.sample_info;
  formData.sample_time = req.body.sample_time;
  formData.duration = req.body.duration;

  db.addTrainingSession(formData, function(data, err) {
    if (err) {
      res.send(500);
    }
    else {
      res.send(data);
    }
  })    
 }
 
 
var postSessionResults = function(req, res) {
  	//NEED TO ACCESS SESSION ID
	var s = req.body.s;
	var m = req.body.m;
	var f = req.body.f;
	var t = req.body.t;
	
  	sessionDB.postSessionResults(sessionID, s, m, f, t, function(data, err) {
    if (err) {
      res.send(500);
    }
    else {
      res.send(data);
    }
  })    
 } 

// Expose call backs to app controller
var routes = {
    // page rend routes
    get_main: getMain,
    get_new_training_session: getNewTrainingSession,
    get_session: getSession,
    get_session_summary: getSessionSummary,
    get_dog_info: getDogInfo,
<<<<<<< HEAD
    get_all_training_sessions: getAllTrainingSessions,
    get_training_session: getSession,
<<<<<<< HEAD
	post_training_session_info: postAddTrainingSession
=======
	post_session_results: postSessionResults
=======
    // get_add_dog: getAddDog,

    // GET routes
    get_all_dogs: getAllDogs,
    get_all_training_sessions: getAllTrainingSessions,
	get_all_sessions: getAllSessions
>>>>>>> FETCH_HEAD
>>>>>>> FETCH_HEAD
	
};

module.exports = routes;
