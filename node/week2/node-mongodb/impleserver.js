/*
    Interact with the MongoDB database form Node APP
*/
var MongoClient = require('mongodb').MongoClient, //Refer to the object of the module
    assert = require('assert');
var url = 'mongodb://localhost:27017/conFusion'; // protocol://server/database


MongoClient.connect(url, function (err, db) { // Use the URI to connect the server with the database, and define a callback to receive the err & db object argumerts through the connect function. 
    assert.equal(err,null); /* If the err equals null:
                                    Continue the excution;
                                Else:
                                    Return the excution & print out the error message.
                                */
    console.log("Connected correctly to server"); 

    var collection = db.collection("dishes"); // Insert a connection into the db
    
    collection.insertOne({name: "Uthapizza", description: "test"}, function(err,result){ // Insert into a document into the db
        assert.equal(err,null); 
        console.log("After Insert:");
        console.log(result.ops); // The document is stored in ops.
        collection.find({}).toArray(function(err,docs){ // Filter the collections to get documents by using object 
            assert.equal(err,null); // toArray(callback): Object -> Array
            console.log("Found:");
            console.log(docs); // docs - result
            db.dropCollection("dishes", function(err, result){ // Delete the collection in the db
               assert.equal(err,null);
               db.close(); // Close the db connection
            });
        });
    });
});