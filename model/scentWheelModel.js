var pg = require('pg');

// Fill this in when database is set up
var DATABASE_URL = process.env.DATABASE_URL || // <-- Heroku URL
                  "postgres://postgres:123@localhost:5432/cis350"; // <-- Replace with your local DB address
//var DATABASE_URL = "postgres://Tobi@localhost/mylocaldb"

// Initial implementation. Use this to update a session with
// trial data.
var updateScentWheelSession = function(data, route_callbck) {
  pg.connect(DATABASE_URL, function(err, client) {
    if (err) {
      // console.log('Error connecting to database ' + err);
      route_callbck(null, err);
    }
    else {
      console.log(data);
      var query = 'UPDATE scentwheelsession ' + 
                  'SET session_string = ' + '\'' + data.session_string + '\', ' +
                      'duration = ' + '\'' + data.duration + '\', ' + 
					        'notes = ' + '\'' + data.notes + '\' ' + 
                  'WHERE id=' + '\'' + data.sessionId + '\';';
      console.log(query);
      client.query(query, function(err, result) {
        if (err) {
          route_callbck(null, err);
          console.log('Error executing query.')
          console.log('Query: ' + query);
          console.log('Error: ' + err);
        }
        else route_callbck(result, null);
        client.end();
      })
    }
  })
}


// Add new training session given a set of data
var addScentWheelSession = function(data, route_callbck) {
	pg.connect(DATABASE_URL, function(err, client) {
		if (err) {
			// console.log('Error connecting to database' + err);
      route_callbck(null, err);
		}
		else {
      // console.log(data);
      var query = 'INSERT INTO scentwheelsession ' + 
                  '(id, dogID, handler, sample_number,'+ 
                  'sample_info, sample_time, record_date, '+
                  'can1, can2, can3, can4) ' + 
                  'VALUES (' + '\'' + data.sessionId + '\'' +','
                             + '\'' + data.dogID + '\'' +','
                             + '\'' + data.handler + '\'' + ','
                             + '\'' + data.sample_num + '\'' + ','
                             + '\'' + data.sample_info + '\'' + ','
                             + '\'' + data.sample_time + '\'' + ','
							               + '\'' + (new Date()) + '\'' + ','
                             + '\'' + data.can1 + '\'' + ','
                             + '\'' + data.can2 + '\'' + ','
                             + '\'' + data.can3 + '\'' + ','
                             + '\'' + data.can4 + '\''
                             + ');';      
			client.query(query, function (err, result) {
  			if (err) {
          route_callbck(null, err);
  				console.log("Error inserting specified data" + err);
          console.log(query);
  			}
  			else route_callbck(result, null);
        client.end();
  		})
		}
	})	
}

var getScentWheelSessionsByDogId = function(dogID, route_callbck) {
  pg.connect(DATABASE_URL, function(err, client) {
    if (err) {
      console.log('Error connecting to database: ' + err);
      route_callbck(null, err);
    }
    else {
      var query = 'SELECT * from scentwheelsession ' + 
                  'WHERE dogID=' + '\'' + dogID +'\'';
      // console.log(query);
      client.query(query, function(err, result) {
        if (err) {
          console.log('Error running query: ');
          console.log(query);
          console.log(err);
          route_callbck(null, err);
        }
        else {
          route_callbck(result.rows, null);
        }
        client.end();
      })
    }
  })
} 

var getScentWheelSessionById = function(sessionId, route_callbck) {
  pg.connect(DATABASE_URL, function(err, client) {
    if (err) {
      console.log('Error connecting to database: ' + err);
      route_callbck(null, err);
    }
    else {
      var query = 'SELECT * from scentwheelsession ' +
                  'WHERE id=' + '\'' + sessionId +'\'';
      client.query(query, function(err, result) {
        if (err) {
          console.log('Error running query: ');
          console.log(query);
          console.log(err);
          route_callbck(null, err);
        }
        else {
          route_callbck(result.rows[0], null);
        }
        client.end();
      })
    }
  })
}

var scentWheelModel = {
  getSessionById: getScentWheelSessionById,
  addSession: addScentWheelSession,
  updateSession: updateScentWheelSession,
  getSessionsByDogId: getScentWheelSessionsByDogId,
}

module.exports = scentWheelModel;