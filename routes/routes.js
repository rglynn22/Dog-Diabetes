
/*********************************************
  Callbacks for Page Loads
 *********************************************/

// Handler for main / home page
var getMain = function(req, res) {
  res.render('index.ejs');
}

// Handler for new training session page
var getNewTrainingSession = function(req, res) {
  res.render('new-session.ejs');
}

// Handler for displaying session page
var getSession = function(req, res) {
  res.render('session.ejs');
}

// Handler for displaying page for adding dog
var getAddDogPage = function(req, res) {
  res.render('add-dog.ejs');
}

// Handler for displaying session summary page
var getSessionSummaryPage = function(req, res) {
  res.render('session-summary.ejs')
}

// Handler for dog selection page
var getDogSelectionMenu = function(req, res) {
  res.render('dog-menu.ejs')
}

/*********************************************
  Callbacks for GET requests
 *********************************************/

// Handler to get all dogs
var getAllDogs = function(req, res) {

}

// Handler to get info for a single dog
var getDogInfo = function(req, res) {

}

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

 // Handler to add new dog to database
 var postAddDog = function(req, res) {

 }

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

  db.addTrainingSession(formData, function(data, err) {
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
    get_main: getMain,
    get_new_training_session: getNewTrainingSession,
    get_all_dogs: getAllDogs,
    get_dog_info: getDogInfo,
    get_all_training_sessions: getAllTrainingSessions,
    get_training_session: getTrainingSession
};

module.exports = routes;