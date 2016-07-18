/*
 This is simple Express application within Node.js.
 */

var express = require('express'), 
	http = require('http');
var hostname = 'localhost';
var port = 3000;
var app = express(); // Initialize a express instance to use its method and other initialization work under the hood

app.use(function(req, res, next) { // Specify a middleware function as a callback for app.use method
	console.log(req.headers); // The definition of Middleware: https://en.wikipedia.org/wiki/Middleware
    res.writeHead(200, { 'Content-Type': 'text/html' });
 	res.end('<html><body><h1>Hello World</h1></body></html>');
});

var server = http.createServer(app); // Create a server, and get access to HTTP request message.
	server.listen(port, hostname, function() { // Set a port to listen the communications from the client.
	console.log(`Server running at http://${hostname}:${port}/`);
});

