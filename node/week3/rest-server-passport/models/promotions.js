/*
REFERENCE for Sub Documents  http://mongoosejs.com/docs/subdocs.html
REFERENCE for Validation like: required, min, max  http://mongoosejs.com/docs/validation

*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose); // Add the Currency Type to the mongoose instance
var Currency = mongoose.Types.Currency; // Load Currency type

var promotionSchema = new Schema({ // Create a schema | data-type
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
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
    }
}, {
    timestamps: true
});


var Promotions = mongoose.model('Promotions', promotionSchema); //  Mongoose automatically maps the 'Promotions' in the arguments to the plural in the collections - a class in the model.
                                                 // The variable - Promotions is an instace for being exported.

module.exports = Promotions;