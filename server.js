process.env.NODE_ENV = 'development';		//we're in the development mode

var express = require ('./config/express'),
	port = process.env.PORT || 8085,
	app = express (),
	listener = null;

listener = app.listen (port, function () {
	console.log ('Server is listening on port: ', listener.address ().port);
});
