var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1'); // Require the model of data of Dishes Collection

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url); 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");


    var newDish = Dishes({ // Create a new document
        name: 'Uthapizza',
        description: 'Test'
    });

    // save the user
    newDish.save(function (err) { // Save the document
        if (err) throw err;
        console.log('Dish created!');

        // get all the users
        Dishes.find({}, function (err, dishes) { // Get all the documents 
            if (err) throw err;

            // object of all the users
            console.log(dishes);
            db.collection('dishes').drop(function () { // Drop all the documents in the collection
                db.close(); // Close the database connection
            }); 
        });
    });
});