var db = require('../models/simpleDB.js');

// Render the main page
// Include proper error message if applicable
var getMain = function(req, res) {
   var err = req.param('error');
   var message;
   if (err == "usr") message = "Invalid username. New users sign up below!";
   else if (err == "pwd") message = "Invalid password. Please try again.";
   else if (err == "login") message = "Please log in to access database.";
   else message = err;
   res.render('main.ejs', {error: message});
};

// Log user in 
var postLogin = function(req, res) {
	  var usr = req.body.username;
	  var pwd  = req.body.password;
	  if (usr != null && usr != ''){
		  db.login(usr, pwd, function(data, err) {
		    if (err) {
		      res.redirect('/?error='+err);
		    } else if (data) {
		      req.session.user = usr; // record user in session
		      req.session.fullname = data;
		      res.redirect('/restaurants');
		    } else {
		      res.redirect('/');
		    }
		  });
	  } else {
		  res.redirect('/?error=usr')
	  }
	};

// Render the restaurant page 
var getRest = function (req, res) {
	if (req.session.user != null){
		db.restaurants(function(data, err) {
		    if (err) {
		      res.redirect('/?error='+err);
		    } else if (data) {
		    	var user = req.session.fullname;
		    	var err = req.param('error');
		    	var message = null;
		    	if (err == "void") message = "Please fill in all fields.";
		    	else if (err == "put") message = "Error storing in database.";
		    	else if (err == "exists") message = "Restraunt already exists.";
		    	else if (err == "empty") message = "Database empty";
		    	else message = err;
		    	res.render('restaurants.ejs', {results: data, user: user, error: message});
		    } else {
		      res.redirect('/?error='+err);
		    }
		});
	} else {
		res.redirect('/?error=login');
	}
};

var getSignUp = function (req, res) {
   var err = req.param('error');
   var message;
   if (err == "void") message = "Please fill in all fields.";
   else if (err == "put") message = "Error storing in database.";
   else if (err == "exists") message = "Username take. Please choose another.";
   else message = err;
   res.render('signup.ejs', {error:message});
};

var getLogout = function(req, res) {
	req.session.user = null;
	res.redirect('/');
	res.send ('Logged out successfully');
};

// Create and log in new user
var postCreateAccount = function(req, res) {
	  var usr  = req.body.username;
	  var pwd  = req.body.password;
	  var name = req.body.fullname;
	  db.create(usr, pwd, name, function(data, err) {
	    if (err) {
	      res.redirect('/signup/?error='+err);
	    } else if (data) {
	      req.session.user = usr;
	      req.session.fullname = name;
	      res.redirect('/restaurants');
	    } else {
	      res.redirect('/signup/?error='+err);
	    }
	  });
	};
	
// Create new restaurant post
var postAddRest = function(req, res) {
	var lat  = req.body.latitude;
	var long  = req.body.longitude;
	var name = req.body.name;
	var dscrpt = req.body.description;
	var usr = req.session.user;
	if (usr != null){
		db.add(lat, long, name, dscrpt, usr, function(data, err) {
		    if (err) {
		    	res.redirect('/restaurants/?error='+err);
		    } else if (data) {
		    	res.redirect('/restaurants');
			} else {
				res.redirect('/restaurants/?error='+err);
		    }
		});
	}
};	

var routes = { 
  get_main: getMain,
  post_login: postLogin,
  get_signup: getSignUp, 
  post_createaccount: postCreateAccount,
  get_restaurants: getRest,
  post_addrestaurant: postAddRest,
  get_logout: getLogout
};

module.exports = routes;
