
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var redis = require("redis"),
client = redis.createClient(42461,"54.208.130.57",{no_ready_check: true});
// client = redis.createClient(<VM PORT>,"VM IP",{no_ready_check: true});

client.auth("aobalvmyjd7afa8p5e7wpx1erlulsydw", function() {
// client.auth("<PASSWORD>", function() {
  console.log('Redis client connected');
});
client.on("error", function (err) {
  console.log("Error " + err);
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add a new User
app.get("/users/new", function (req, res) {
  res.render("new", {
    title: 'App42PaaS Express Redis Application'
  });
});

// Save the Newly created User
app.post("/users", function (req, res) {
  var name=req.body.name;
  client.lpush('name', name, function (err, result) {
	if (err || !result)
	  console.log(err);
	else
	  res.redirect('/');	
  });
});

// App root
app.get('/', function(req, res){  
   client.lrange("name", 0, 1000, function (err, result) {
   console.log(result); 
     if (err || !result)
	   console.log(err);
	  else
		res.render('users', {users: result, title: 'App42PaaS Express Redis Application'}); 
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
