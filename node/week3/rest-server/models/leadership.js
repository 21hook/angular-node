/*
REFERENCE for Sub Documents  http://mongoosejs.com/docs/subdocs.html
REFERENCE for Validation like: required, min, max  http://mongoosejs.com/docs/validation

*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leadershipSchema = new Schema({ // Create a schema | data-type
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
    	type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
  	description: {
    	type: String,
        required: true
    }
}, {
    timestamps: true
});


var Leaderships = mongoose.model('Leaderships', leadershipSchema); //  Mongoose automatically maps the 'Dishes' in the arguments to the plural in the collections - a class in the model.
                                                 // The variable - Dishes is an instace for being exported.

module.exports = Leaderships;