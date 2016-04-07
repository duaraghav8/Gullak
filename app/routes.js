'use strict';

var controllers = require ('./controllers'),
    apiRouter = require ('express').Router ();

module.exports = function (app, passport) {
app.use(function (req, res, next) {
    	// Website you wish to allow to connect
    	res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

    	// Request methods you wish to allow
    	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    	// Request headers you wish to allow
    	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    	// Set to true if you need the website to include cookies in the requests sent
    	// to the API (e.g. in case you use sessions)
    	res.setHeader('Access-Control-Allow-Credentials', true);

    	// Pass to next layer of middleware
    	next();
});

  app
    .get ('/', controllers.getHomePage)
    .get ('/login', controllers.getLoginPage)
    .post ('/login', passport.authenticate ('local_login', {
      successRedirect: '/profile',
      failureRedirect: '/login'
    }))
    .get ('/profile', controllers.isLoggedIn, controllers.profile)
    .get ('/logout', controllers.isLoggedIn, controllers.logout);

  //===============API Calls=========================
  //=================================================

  apiRouter
    .get ('/start', controllers.isLoggedIn, controllers.getGullakConfiguration)   //get basic info & configuration for Gullak
    .post ('/start', controllers.isLoggedIn, controllers.start)   //register for Gullak, begin saving
    .get ('/stop', controllers.isLoggedIn, controllers.stop)    //stop Gullak saving
    .get ('/status', controllers.isLoggedIn, controllers.status)    //current status (saving, balance, etc.)
    .get ('/withdraw', controllers.isLoggedIn, controllers.withdraw);    //transfer all saved cash to main account

  app.use ('/api', apiRouter);

  //===============404===============================
  //=================================================

  app.all ('*', controllers.notFound);

  return (app);
}
