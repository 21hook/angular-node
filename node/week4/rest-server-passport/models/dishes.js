/*
REFERENCE for Sub Documents  http://mongoosejs.com/docs/subdocs.html
REFERENCE for Validation like: required, min, max  http://mongoosejs.com/docs/validation

*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose); // Add the Currency Type to the mongoose instance
var Currency = mongoose.Types.Currency; // Load Currency type

var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, // cross-reference for the Dish model
        ref: 'User'
    }
}, {timestamps: true});

var dishSchema = new Schema({ // Create a schema | data-type
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
    	type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ' ',
    },
  	price: {
        type: Currency,
        required: true
  	},
  	description: {
    	type: String,
        required: true
    },
    comments: [commentSchema],
}, {
    timestamps: true
});


var Dishes = mongoose.model('Dishes', dishSchema); //  Mongoose automatically maps the 'Dishes' in the arguments to the plural in the collections - a class in the model.
                                                 // The variable - Dishes is an instace for being exported.

module.exports = Dishes;