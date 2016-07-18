var http = require('http'); // The 'htpp' variable's name remind me of a relation to which node module I'm using.
var fs = require('fs');
var path = require('path');
var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function (req, res) {
    console.log('Request for '+req.url+' by method '+req.method);

    if (req.method == 'GET') {
        var fileUrl;

        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public'+fileUrl);
        var fileExt = path.extname(filePath);

        if (fileExt == '.html') {
            fs.exists(filePath, function (exists) {
                if (!exists) {
					res.writeHead(404, {'Content-Type': 'text/html'});
					res.end('<html><body><h1>Error 404: '+fileUrl+' not found</h1></body></html>');
					return;
                }
                res.writeHead(404, {'Content-Type': 'text/html'});
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>Error 404: '+fileUrl+' not a HTML file</h1>');
        }
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>Error 404: '+req.method+' not supported.</h1>');
    }
});

server.listen(port, hostname, function() {
console.log(`Server running at http://${hostname}:${port}/`);
});

// First task - practice it.
// The browser always add a slash '/' after the url.// Debugger: Logic error & Syntax error // Pretty, preview, raw
// Second task
// Commnet the code snippets above.