var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url); // protocol://host:port/database
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected correctly to server");

    Promotions.create({
      "name": "Weekend Grand Buffet",
      "image": "images/buffet.png",
      "label": "New",
      "price": "19.99",
      "description": "Featuring . . ."
    }, function(err, promo) {
        if(err) throw err;
        console.log('Promotion created!');
        console.log(promo);

        db.collection('Promotions').drop(function () {
          db.close();
        });

    });
});