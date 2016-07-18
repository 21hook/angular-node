var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express(); // Initialize a 'express' instace.

app.use(morgan('dev')); // Specify a middleware function for express.
app.use(bodyParser.json()); // Prese the body of HTTP message with a middleware function.

app.all('/dishes', function(req,res,next) { // Match all type of request methods.
      res.writeHead(200, { 'Content-Type': 'text/plain' }); //  Set the status code and the content type.
      next(); // Excute the function when the route is matched.
});

app.get('/dishes', function(req,res,next){ // Match the 'get' method of HTTP request
        res.end('Will send all the dishes to you!'); // Add data into the body of HTTP message, and send HTTP message back to the client.
});

app.post('/dishes', function(req, res, next){
     res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes', function(req, res, next){
        res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.put('/dishes/:dishId', function(req, res, next){
    res.write('Updating the dish: ' + req.params.dishId + '\n'); // Add data into the body of HTTP message
    res.end('Will update the dish: ' + req.body.name + 
            ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});

app.use(express.static(__dirname + '/public')); /* Spectify a built-in middleware function of 'express' to serve the static files in the server.
                                                   Now, you can access to the static files by using uri like these:
                                                      http://localhost:3000/images/kitten.jpg
                                                      http://localhost:3000/css/style.css
                                                      http://localhost:3000/js/app.js
                                                      http://localhost:3000/images/bg.png
                                                      http://localhost:3000/hello.html */
                                                // Note: __dirname or __file give the full path to the current directory or file.
app.listen(port, hostname, function(){ // Use app to listen the spcific service for host on the server.
  console.log(`Server running at http://${hostname}:${port}/`);
});