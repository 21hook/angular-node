/*
  Use router = express.router() substitle with these snippets:


*/
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev')); // Use middleware funtion within app.use() to print out log messages in the prompt.

var dishRouter = express.Router(); // Use modular & mountable mini app to handle routes.
 
dishRouter.use(bodyParser.json()); // Prase the body of HTTP message if needed within router.

dishRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send all the dishes to you!');
})

.post(function(req, res, next){
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);    
})

.delete(function(req, res, next){
        res.end('Deleting all dishes');
});

dishRouter.route('/:dishId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next(); // You can provide multiple callback functions that behave like middleware to handle a request. There some of examples on the http://expressjs.com/en/guide/routing.html
              // The only exception is that these callbacks might invoke next('route') to bypass the remaining route callbacks.
})

.get(function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});

app.use('/dishes',dishRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*
  Application-level middleware e.g. app.use();
  Router-level middleware e.g. router.use();
  Built-in middleware e.g. express.static();
*/