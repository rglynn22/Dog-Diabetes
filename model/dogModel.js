var pg = require('pg');

var DATABASE_URL = process.env.DATABASE_URL || 
                  "postgres://postgres:123@localhost:5432/cis350";

// Get info for all dogs in database
var getAllDogs = function(route_callbck) {
  pg.connect(DATABASE_URL, function(err, client) {
    if (err) {
      console.log('Error connecting to database' + err);
    }
    else {
      var query = 'SELECT * FROM Dog';
      client.query(query, function(err, result) {
        if (err) {
          console.log("Error running specified query" + err);
        }
        else {
          var rows = result.rows;
          var data = [];
          for (var i = 0; i < rows.length; i++) {
            data.push({'name': rows[i].name, 'id':rows[i].id});
          }
          route_callbck(data, null);
          client.end();
        }
      })
    }
  })
}

// Get all info from dog with id dogId
var getDogInfo = function(dogId, route_callbck) {
  pg.connect(DATABASE_URL, function(err, client) {
    if (err) {
      console.log('Error connecting to database' + err);
    }
    else {
      var query = 'SELECT * FROM Dog Where id='+ dogId+';';
      client.query(query, function(err, result){
        if (err) {
          console.log("Error running specified query" + err);
        }
        else {
          var rows = result.rows;
          route_callbck(rows, null);
          client.end();
        }
      });
    }    
  });
}

// Add a dog given a set of data
var addDog = function(dogData, route_callbck) {

  pg.connect(DATABASE_URL, function(err, client) {
    if (err) {
      console.log('Error connecting to database' + err);
    }
    else {
      var query = 'INSERT INTO dog (id, name, age, start_date, breed)' +
                  'VALUES ('+ '\'' + dogData.id + '\'' + ',' 
                            + '\'' + dogData.name + '\'' + ',' 
                            + '\'' + dogData.age + '\'' + ','
                            + '\'' + dogData.date + '\'' + ','
                            + '\'' + dogData.breed + '\'' +');'
      client.query(query, function(err, result) {
        if (err) {
          console.log("Error running specified query" + err);
          console.log(query);
        }
        else {
          console.log(result);
          route_callbck(result, null);
          client.end();
        }
      });
    }
  });
}

var dogModel = {
  getAllDogs: getAllDogs,
  getDogInfo: getDogInfo,
  addDog: addDog,
}

module.exports = dogModel;