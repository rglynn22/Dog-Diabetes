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
var getNewTrainingSession = function(req, res) {
  var dog = "Skip";
  res.render('new-session.ejs', {name: dog});
}

// Handler for displaying session page
var getSession = function(req, res) {
  res.render('session.ejs');
  //res.post(req, postAddTrainingSession);
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
  var dogID = req.query.id;
  var dog = req.query.dog;

  sessionDB.getSessionsByDogId(dogID, function(data, err) {
    if (err) {
      console.log(err);
    }
    else {
      var result = [];
      for (var i = 0; i < data.length; i++) {
        result.push({date: data[i].record_date, sessionId: data[i].id});
      }
      res.render('dog-menu.ejs', {name: dog, sessions: result});
    }
  })

  // change data and dogs to pull info from db

  
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

var getNewDogForm = function(req, res) {
  res.render('add-dog.ejs');
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
  formData.sessionID = req.body.uuid;
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
// var postSessionResults = function(req, res) {
//   //NEED TO ACCESS SESSION ID
// 	var s = req.body.s;
// 	var m = req.body.m;
// 	var f = req.body.f;
// 	var t = req.body.t;
	
//   	sessionDB.postSessionResults(sessionID, s, m, f, t, function(data, err) {
//     if (err) {
//       res.send(500);
//     }
//     else {
//       res.send(data);
//     }
//   })    
//  } 

// Expose call backs to app controller
var routes = {
    // page rend routes
    get_main: getMain,
    get_new_training_session: getNewTrainingSession,
    get_session: getSession,
    get_session_summary: getSessionSummary,
    get_dog_info: getDogInfo,
    // get_training_session: getSession,
    get_new_dog_form: getNewDogForm,

    // GET routes
    get_all_dogs: getAllDogs,
    //get_all_training_sessions: getAllTrainingSessions,
	  //get_all_sessions: getAllSessions

    post_add_training_session: postAddTrainingSession,
    post_add_dog: postAddDog,
	
};

module.exports = routes;
