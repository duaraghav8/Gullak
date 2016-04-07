'use strict';

var express = require ('express'),
	bodyParser = require ('body-parser'),
	dbObject = require ('./mongoose') (),
	cookieParser = require ('cookie-parser'),
	session = require ('express-session'),
	passport = require ('passport'),
	config = require ('./config'),
	serveStatic = require ('serve-static'),
	app = express ();

module.exports = function () {
	require ('./passport') (passport);

	app
		.use (bodyParser.urlencoded ({extended: true}))
		.use (bodyParser.json ())
		.use (cookieParser ())
		.use (session ({
			secret: config.sessionSecret,
			resave: true,
			saveUninitialized: true
		}))
		.use (passport.initialize ())
		.use (passport.session ())
		.use (serveStatic (__dirname + '/../public'))
		.set ('view engine', 'ejs')
		.set ('views', __dirname + '/../public');

	require ('../app/routes') (app, passport);

	if (process.env.NODE_ENV == 'development') {
		console.log ('We\'re in Development Environment');
	}
	if (process.env.NODE_ENV == 'production') {
		console.log ('We\'re in Production Environment');
	}

	return (app);
};
