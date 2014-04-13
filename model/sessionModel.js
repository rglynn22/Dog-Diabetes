var pg = require('pg');

// Fill this in when database is set up
var DATABASE_URL = process.env.DATABASE_URL; //--Heroku Server
//var DATABASE_URL = "postgres://Tobi@localhost/mylocaldb"

// Get all info regarding a session with id sessionId
var getSessionInfo = function(sessionId, route_callbck) {

  pg.connect(DATABASE_URL, function(err, client) {
    if (err) {
      console.log('Error connecting to database' + err);
    }
    else {
      var query = 'SELECT * FROM Session where id = ' + sessionId + ';';
      client.query(query, function(err, result){
        if (err) {
          console.log("Error running specified query" + err);
        }
        else route_callbck(result, null);
      })
    }    
  })
}


// Add new training session given a set of data
var addTrainingSession = function(data, route_callback) {
	pg.connect(DATABASE_URL, function(err, client) {
		if (err) {
			console.log('Error connecting to database' + err);
		}
		else {
      var query = 'INSERT * INTO session' + 
                  '(id, dogID, location, canister, handler, sample_number, 
                    sample_info, time, duration, successes, misses, false_alerts, 
                    total_trials)' + 
                  'VALUES (' + data.id + ','
                             + data.dogId + ','
                             + data.location + ','
                             + data.canister + ','
                             + data.handler + ','
                             + data.sample_number + ','
                             + data.sample_info + ','
                             + data.time + ','
                             + data.duration + ','
                             + data.successes + ','
                             + data.misses + ','
                             + data.false_alerts + ','
                             + data.total_trials + ');';
			client.query(query, function (err, result) {
				if (err) {
					console.log("Error inserting specified data" + err);
				}
				else route_callback(result, null);
			})
		}
	})
	
}

var sessionModel = {
  getSessionInfo: getSessionInfo,
  addTrainingSession: addTrainingSession
}