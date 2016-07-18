var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');

var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url); // protocol://host:port/database
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected correctly to server");

    Dishes.create({
        "name": "Uthapizza",
        "image": "images/uthapizza.png",
        "category": "mains",
        "label": "Hot",
        "price": "4.99",
        "description": "A unique . . .",
        "comments": [
            {
                "rating": 5,
                "comment": "Imagine all the eatables, living in conFusion!",
                "author": "John Lemon"
            }
        ]
    }, function(err, dish) {
        if(err) throw err;
        console.log('Dish created!');
        console.log(dish);

/*-------------Insert a doc into the existing doc--------------*/
    setTimeout(function() {

        dish.comments.push({ // Insert a document into a document
            "rating": 4,
            "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
            "author": "Paul McVites"
        });
        dish.save(function(err, dish) {
            console.log('Updated Comments!');
            console.log(dish);

            db.collection('dishes').drop(function () {
                db.close();
            });
        });

/*-------------End of the insertion--------------*/
    }, 2000);
    });
});