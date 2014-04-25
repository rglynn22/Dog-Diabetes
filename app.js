var express = require('express');
// var routes = require('./routes/routes.js');
var routes = require('./routes/routes.js');
var path = require('path');
var app = express();

app.use(express.bodyParser());
app.use(express.logger("default"));
app.use(express.cookieParser());
app.use('/css', express.static(path.join(__dirname, '/views/css')));
app.use('/js', express.static(path.join(__dirname, '/views/js')));

// Using random 20 digit prime as secret key
app.use(express.session({secret:'48112959837082048697'}));

app.get('/', routes.get_main);
app.get('/newsessionform', routes.get_canister_session_form);
app.get('/newwheelsession', routes.get_scent_wheel_session_form);
app.get('/canistersession', routes.get_canister_session);
app.get('/scentwheelsession', routes.get_scent_wheel_session);
app.get('/sessionsummary', routes.get_session_summary);
app.get('/doginfo', routes.get_dog_info);
app.get('/newdogform', routes.get_new_dog_form);
app.get('/newscentwheelsessionform', routes.get_scent_wheel_session_form);
app.post('/addsession', routes.post_add_training_session);
app.post('/adddog', routes.post_add_dog);

/* Run the server */
var port = Number(process.env.PORT || 3000)
app.listen(port);
console.log('Server running on port ' + port);