'use strict';

var mongoose = require ('mongoose'),
    config = require ('../config/config'),
    Schema = mongoose.Schema,
    userSchema, gullakSchema,
    userModel, gullakModel;

userSchema = new Schema ({
  name: String,
  account_no: String,
  pin: String,
  gullak: String   //reference to Object ID in gullakAccounts Collection to this user's Gullak Account
});

gullakSchema = new Schema ({
  user: String,   //reference to Object ID of the user this account belongs to in users Collection
  net_savings: Number,   //total savings accumulated by Gullak thus far
  active: Boolean,
  configuration: {
    save_amount: Number,   //how much money is gullak taking out of your main account, after every timeInterval number of days
    time_interval: Number
  }
});

userModel = mongoose.model (config.userCollection, userSchema, config.userCollection);
gullakModel = mongoose.model (config.gullakCollection, gullakSchema, config.gullakCollection);
