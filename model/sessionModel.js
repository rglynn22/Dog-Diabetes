var pg = require('pg');

// Fill this in when database is set up
var DATABASE_URL = process.env.DATABASE_URL || 
                  "postgres://postgres:123@localhost:5432/cis350"; //--Heroku Server
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

// Initial implementation. Use this to update a session with
// trial data.
var updateTrainingSession = function(data, route_callbck) {
  pg.connect(DATABASE_URL, function(err, client) {
    if (err) {
      console.log('Error connecting to database ' + err);
    }
    else {
      console.log(data);
      var query = 'UPDATE session ' + 
                  'SET successes = ' + '\'' + data.successes + '\'' +
                      'misses = ' + '\'' + data.misses + '\'' + 
                      'false_alerts = ' + '\'' + data.false_alerts + '\'' +
                      'total_trials = ' + '\'' + data.total_trials + '\'' +
                  'WHERE id=' + '\'' + data.sessionID + '\';';
      client.query(query, function(err, result) {
        if (err) {
          console.log('Error executing query.')
          console.log('Query: ' + query);
          console.log('Error: ' + err);
        }
        else {
          route_callbck(result, null);
        }
      })

    }
  })
}


// Add new training session given a set of data
var addTrainingSession = function(data, route_callbck) {
	pg.connect(DATABASE_URL, function(err, client) {
		if (err) {
			console.log('Error connecting to database' + err);
		}
		else {
      // console.log(data);
      var query = 'INSERT INTO session ' + 
                  '(id, dogID, location, canister, handler, sample_number,'+ 
                  'sample_info, time, duration) ' + 
                  'VALUES (' + '\'' + data.sessionID + '\'' +','
                             + '1' + ','
                             + '\'' + data.location + '\'' + ','
                             + '\'' + data.canister + '\'' + ','
                             + '\'' + data.handler + '\'' + ','
                             + '\'' + data.sample_num + '\'' + ','
                             + '\'' + data.sample_info + '\'' + ','
                             + '\'' + data.sample_time + '\'' + ','
                             + '\'' + data.duration + '\''
                             // + data.successes + ','
                             // + data.misses + ','
                             // + data.false_alerts + ','
                             // + data.total_trials + ');';
                             + ');';
      console.log(query);
			client.query(query, function (err, result) {
				if (err) {
					console.log("Error inserting specified data" + err);
				}
				else route_callbck(result, null);
			})
		}
	})
	
}

var sessionModel = {
  getSessionInfo: getSessionInfo,
  addTrainingSession: addTrainingSession,
  updateTrainingSession: updateTrainingSession,
}

module.exports = sessionModel;