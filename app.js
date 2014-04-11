var express = require('express');
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
// app.get('/adddog', routes.get_add_dog);
app.get('/newsession', routes.get_new_training_session);
app.get('/session', routes.get_session);
app.get('/sessionsummary', routes.get_session_summary);
app.get('/doginfo/:dogname', routes.get_dog_info);
app.get('/getsessions/:dogname', routes.getAllSessions);

/* Run the server */
var port = Number(process.env.PORT || 3000)
app.listen(port);
console.log('Server running on port ' + port);