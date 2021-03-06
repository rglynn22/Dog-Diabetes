var pg = require('pg');

// Fill this in when database is set up
var DATABASE_URL = process.env.DATABASE_URL || // <-- Heroku URL
                   "postgres://postgres:123@localhost:5432/cis350"; // <-- Replace with your local DB address
//var DATABASE_URL = "postgres://Tobi@localhost/mylocaldb"

// Initial implementation. Use this to update a session with
// trial data.
var updateTrainingSession = function(data, route_callbck) {
  pg.connect(DATABASE_URL, function(err, client) {
    if (err) {
      console.log('Error connecting to database ' + err);
      route_callbck(null, err);
    }
    else {
      console.log(data);
      var query = 'UPDATE session ' + 
                  'SET successes = ' + '\'' + data.successes + '\',' +
                      ' misses = ' + '\'' + data.misses + '\',' + 
                      ' false_alerts = ' + '\'' + data.false_alerts + '\',' +
                      ' total_trials = ' + '\'' + data.total_trials + '\',' +
					          ' duration = ' + '\'' + data.duration + '\',' +
						      ' notes = ' + '\'' + data.notes + '\'' +
                  ' WHERE id=' + '\'' + data.sessionId + '\';';
      // console.log('Query: ' + query);
      client.query(query, function(err, result) {
        if (err) {          
          console.log('Error executing query.')
          console.log('Query: ' + query);
          console.log('Error: ' + err);
          route_callbck(null, err);
        }
        else {
          route_callbck(result, null);
          client.end();
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
      route_callbck(null, err);
		}
		else {
      // console.log(data);
      var query = 'INSERT INTO session ' + 
                  '(id, dogID, location, canister, handler, sample_number,'+ 
                  'sample_info, sample_time, record_date) ' + 
                  'VALUES (' + '\'' + data.sessionID + '\'' +','
                             + '\'' + data.dogID + '\'' +','
                             + '\'' + data.location + '\'' + ','
                             + '\'' + data.canister + '\'' + ','
                             + '\'' + data.handler + '\'' + ','
                             + '\'' + data.sample_num + '\'' + ','
                             + '\'' + data.sample_info + '\'' + ','
                             + '\'' + data.sample_time + '\'' + ','
							               + '\'' + (new Date()) + '\''
                             + ');';      
			client.query(query, function (err, result) {
  			if (err) {          
  				console.log("Error inserting specified data" + err);
          route_callbck(null, err);
          // console.log(query);
  			}
  			else route_callbck(result, null);
        client.end();
  		})
		}
	})	
}

var getSessionsByDogId = function(dogID, route_callbck) {
  pg.connect(DATABASE_URL, function(err, client) {
    if (err) {
      console.log('Error connecting to database: ' + err);
      route_callbck(null, err);
    }
    else {
      var query = 'SELECT * from session ' + 
                  'WHERE dogID=' + '\'' + dogID +'\';';
      // console.log(query);
      client.query(query, function(err, result) {
        if (err) {
          console.log('Error executing query.')
          console.log('Query: ' + query);
          console.log('Error: ' + err);
          route_callbck(null, err);
        }
        else route_callbck(result.rows, null);
        client.end();
      })
    }
  })
} 

var getSessionById = function(sessionId, route_callbck) {
  pg.connect(DATABASE_URL, function(err, client) {
    if (err) {
      console.log('Error connecting to database: ' + err);
      route_callbck(null, err);
    }
    else {
      var query = 'SELECT * from session ' +
                  'WHERE id=' + '\'' + sessionId +'\';';
      console.log(query);
      client.query(query, function(err, result) {
        if (err) {
          console.log('Error running query: ');
          console.log(query);
          console.log(err);
          route_callbck(null, err);
        }
        else route_callbck(result.rows[0], null);
        client.end();
      })
    }
  })
}

var sessionModel = {
  getSessionById: getSessionById,
  addTrainingSession: addTrainingSession,
  updateTrainingSession: updateTrainingSession,
  getSessionsByDogId: getSessionsByDogId,
}

module.exports = sessionModel;