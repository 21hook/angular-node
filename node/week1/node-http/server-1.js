var http = require('http'); // Import 'htpp' module  
var hostname = 'localhost';
var port = 3000;
 

var server = http.createServer(function(req, res){ // Create a (virtural) server to get access to HTTP resquest message and response message.
	console.log(req.headers); // Call the callback to get access to the head of HTTP message.
    res.writeHead(200, { 'Content-Type': 'text/html' }); // Call the callback to write some message into the head of HTTP message sent back to the client.
	res.end('<html><body><h1>Hello World</h1></body></html>'); // [Include some messages into the body of HTTP message], and send it back to the client.
 });

server.listen(port, hostname, function(){ // Set a listen port to listen the communications form the client.
  console.log(`Server running at http://${hostname}:${port}/`); // Once the server starts, print out the message of the host name and port number.
});