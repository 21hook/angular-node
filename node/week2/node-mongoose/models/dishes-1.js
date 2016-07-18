var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Get a instace of mongoose's scheme
var dishSchema = new Schema({ // Create a schema || Define a data type
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
var Dishes = mongoose.model('Dish', dishSchema); // Add it to the collections


module.exports = Dishes;