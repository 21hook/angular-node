var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var leaderRouter = express.Router();

var Leaders = require('../models/leadership');

leaderRouter.route('/')
.get(function (req,res,next) {
    Leaders.find({}, function (err, leaders) {
      if (err) throw err;
      res.json(leaders);
    });
})
.post(function(req, res, next){
    Leaders.create(req.body, function (err, leaders) {
      if (err) throw err;
      console.log('Leaders created');
      var id = leaders.id;

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Add the leaders with id: ' + id);
    });
})
.delete(function(req, res, next){
    Leaders.remove({}, function (err, leaders) {
      if (err) throw err;
      res.json(leaders);
    });
});

leaderRouter.route('/:id')
.get(function(req,res,next){
    Leaders.findById(req.params.id, function (err, leader) {
      if(err) throw err;
      res.json(leader);
    });
})
.put(function(req, res, next){
      Leaders.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {
        new: true
      }, function (err, leader) {
        if (err) throw err;
        res.json(leader);
      });
})
.delete(function(req, res, next){
    Leaders.findByIdAndRemove(req.params.id, function (err, leader) {
      res.json(leader);
    });
});


module.exports = leaderRouter;