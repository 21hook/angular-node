var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	username: String,
	password: String,
  OauthId: String, // store OAuth ID from facebook's authorization server
  OauthToken: String, // store OAuth Token from facebook's authorization server
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
	admin: {
		type: Boolean,
		default: false
	}
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
