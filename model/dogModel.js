var pg = require('pg');

// Fill this in when database is set up
var DATABASE_URL = '';

// Example of how to run a query
var getDogInfo = function(dogId, route_callbck) {

  pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      console.log('Error connecting to database' + err);
    }
    else {
      var query = client.query('SELECT * FROM Dog', function(err, result){
        if (err) {
          console.log("Error running specified query" + err);
        }
        else {
          console.log(result);
          route_callbck(result, null);
        }
      })
    }    
  })
}

var dogModel = {
  getDogInfo: model_getDogInfo
}

module.export(dogModel);