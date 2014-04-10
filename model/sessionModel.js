var pg = require('pg');

// Fill this in when database is set up
var DATABASE_URL = process.env.DATABASE_URL;

// Example of how to run a query
var getSessionInfo = function(sessionId, route_callbck) {

  pg.connect(DATABASE_URL, function(err, client) {
    if (err) {
      console.log('Error connecting to database' + err);
    }
    else {
      var query = client.query('SELECT * FROM Session', function(err, result){
        if (err) {
          console.log("Error running specified query" + err);
        }
        else route_callbck(result, null);
      })
    }    
  })
}


var postSessionResults = function(sessionId, s, m, f, t, route_callbck) {
    
	pg.connect(DATABASE_URL, function(err, client) {
      if (err) {
        console.log('Error connecting to database' + err);
      }
      else {
        client.query("UPDATE session SET successes=s, misses=m, false_alerts=f, total_trials=t WHERE id = sessionId;");
      }    
    })
}

var sessionModel = {
  getSessionInfo: getSessionInfo,
  storeSessionResults: storeSessionResults
}