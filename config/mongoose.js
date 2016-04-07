'use strict';

var mongoose = require ('mongoose'),
    config = require ('./config');

module.exports = function () {
  mongoose.connect (config.dbURL);
  mongoose.connection.once ('open', function () {
    console.log ('Connection with MongoDB established');
  });
  require ('../app/models');
};
