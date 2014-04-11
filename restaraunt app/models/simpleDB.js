var AWS = require('aws-sdk');
AWS.config.loadFromPath('config.json');
var simpledb = new AWS.SimpleDB();

/* The function below is an example of a database method. Whenever you need to 
   access your database, you should define a function (myDB_addUser, myDB_getPassword, ...)
   and call that function from your routes - don't just call SimpleDB directly!
   This makes it much easier to make changes to your database schema. */
var myDB_login = function(user, password, callback){
	console.log('Searching for user ' + user);	
	simpledb.getAttributes({DomainName:'users', ItemName: user}, function (err, data) {
	    if (err) {
	    	callback(null, "Lookup error: "+ err);
	    } else if (data.Attributes === undefined) {
	    	// user was not found
	    	callback(null, "usr");
	    } else {
	    	var valid = 0;
	    	var name;
	    	// user was found, check for correct password
	    	for (i = 0; i<data.Attributes.length; i++){
	    		if (data.Attributes[i].Name === "password"){
	    			if (data.Attributes[i].Value === password){
	    				valid++;
	    			}
	    		} else if (data.Attributes[i].Name === "fullname"){
	    			valid++;
	    			name = data.Attributes[i].Value;
	    		}
	    	}
	    	if (valid == 2) callback(name, null);
	    	else callback(null, "pwd");
	    }
	});
};

var myDB_addAccount = function(user, password, fullname, callback){
  console.log('Create account for user ' + user);	
  // reject if any input field is empty
  if (!user || !password || !fullname ||
	   user === "" || password === "" || fullname === "") {
	  callback(null, "void");
  } else {
	  // attempt to create user account
	  simpledb.getAttributes({DomainName:'users', ItemName: user}, function (err, data) {
	    if (err) {
	    	callback (null, err);
	    } else if (data.Attributes == undefined) {
	      simpledb.putAttributes({DomainName:'users', ItemName: user,
	    	 Attributes: [{Name: 'password', Value: password},
	    	              {Name: 'fullname', Value: fullname}]}, 
	    	 function (err, data) {
	    	    if (err) {
	    	    	callback (null, "put");
	    	    } else {
	    	    	callback (true, null);
	    	    }
	    	 });
	    } else {
	      callback (null, "exists");
	    }
	  });
  };
};

var myDB_addRestaurant = function(lat, long, name, dscrpt, usr, callback){
	  console.log('Add new restaruant');	
	  // reject if any input field is empty
	  if (!lat || !long || !name || !dscrpt || !usr ||
		   name === "" || dscrpt === "" || usr === "") {
		  callback(null, "void");
	  } else {
		  simpledb.getAttributes({DomainName:'restaurants', ItemName: name}, function (err, data) {
		    if (err) {
		    	callback (null, err);
		    } else if (data.Attributes == undefined) {
		      simpledb.putAttributes({DomainName:'restaurants', ItemName: name,
		    	 Attributes: [{Name: 'latitude', Value: lat},
		    	              {Name: 'longitude', Value: long},
		    	              {Name: 'description', Value: dscrpt},
		    	              {Name: 'creator', Value: usr}]}, 
		    	 function (err, data) {
		    	    if (err) {
		    	    	callback (null, "put");
		    	    } else {
		    	    	callback (true, null);
		    	    }
		    	 });
		    } else {
		      callback (null, "exists");
		    }
		  });
	  };
	};


var myDB_restaurants = function(callback){
  console.log('Searching for restaurants');	
	simpledb.select({SelectExpression: 'select * from restaurants', ConsistentRead: true}, function (err, data) {
      if (err) {
	    callback(null, "Lookup error: "+ err);
	  } else if (data === undefined) {
	    callback(null, "empty");
	  } else {
		 var results = [];
		 for (i = 0; i<data.Items.length; i++){
			var item = {name: data.Items[i].Name};
			var valid = 0;
			// check all attributes in item
		    for (j = 0; j<data.Items[i].Attributes.length; j++){
		    	var name = data.Items[i].Attributes[j].Name;
		    	var value = data.Items[i].Attributes[j].Value;
		    	if (name === 'latitude'){
		    		item.lat = value;
		    		valid++;
		    	} else if (name === 'longitude'){
		    		item.long = value;
		    		valid++;
		    	} else if (name === 'description'){
		    		item.dscrpt = value;
		    		valid++;
		    	} else if (name === 'creator'){
		    		item.usr = value;
		    		valid++;
		    	} 
		    }
		    // if item had all correct attributes, add it to results
		    if (valid == 4) {
		    	results.push(item);
		    }
		 }
		 callback(results, null);
	  }
   });
};


/* We define an object with one field for each method. For instance, below we have
   a 'lookup' field, which is set to the myDB_lookup function. In routes.js, we can
   then invoke db.lookup(...), and that call will be routed to myDB_lookup(...). */

var database = { 
  login: myDB_login,
  restaurants: myDB_restaurants,
  create: myDB_addAccount, 
  add: myDB_addRestaurant
};
                                        
module.exports = database;
                                        
