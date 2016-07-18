var dishRouter = require('./dishRouter');
var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderRouter');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var port = 3000, host = 'localhost';


app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);
app.listen(port, host, function() {
    console.log(`Server running at http://${host}:${port}`)
});
