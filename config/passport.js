var config = require ('./config'),
    localStrategy = require ('passport-local').Strategy,
    userModel = require ('mongoose').model (config.userCollection);

module.exports = function (passport) {
  passport.serializeUser (function (user, done) {
		done (null, user.id);
	});
	passport.deserializeUser (function (id, done) {
		userModel.findById (id, function (err, user) {
			done (err, user);
		});
	});

  //===============Local Login Strategy==========================
  //=============================================================
  passport.use ('local_login', new localStrategy ({
    usernameField: 'account_no',
    passwordField: 'pin',
    passReqToCallback: true
  },
  function (req, accountNo, pin, done) {
    userModel.findOne ({'account_no': accountNo}, {'account_no': 1, 'pin': 1}, function (err, response) {
      if (err) {
        return (done (err));
      }
      else if (response && response.pin === pin) {
        return (done (null, response));
      }
      return (done (null, false));
    });
  }));
};
