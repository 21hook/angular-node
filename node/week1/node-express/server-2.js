var express = require('express');
var morgan = require('morgan'); // Allow you to print out log information on the serverside.

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev')); // Specify a middleware for Express.

app.use(express.static(__dirname + '/public')); // Specify a middleware function for Express to serve static files in the server.

app.listen(port, hostname, function(){ /* This is equivalent to these done by app implicitly:
										var http = require('http');

										http.createServer(callbak(req, res));
										http.listen(port, host, callback);
										*/
  console.log(`Server running at http://${hostname}:${port}/`);
});