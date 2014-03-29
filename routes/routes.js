var db = require('../models/parseDB.js');

/*********************************************
  Callbacks for GET requests
 *********************************************/

// Handler for main / home page
var getMain = function(req, res) {

}

// Handler for dog selection page
var getDogSelection = function(req, res) {

}

// Handler for training session selection
var getTrainingSelection = function(req, res) {

}

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

}

/*********************************************
  Callbacks for POST requests
 *********************************************/

 // Handler to add new dog to database
 var postAddDog = function(req, res) {

 }

// Handler to add new training session to database
 var postAddTrainingSession = function(req, res) {
    
 }

// Expose call backs to app controller
var routes = {
    get_main = getMain,
    get_all_dogs = getAllDogs,
    get_dog_info = getDogInfo,
    get_all_training_sessions = getAllTrainingSessions,
    get_training_session = get_training_session
};

module.exports = routes;