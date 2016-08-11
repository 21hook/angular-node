var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var promotionRouter = express.Router();

var Promotions = require('../models/promotions')

promotionRouter.route('/')
.get(function (req,res,next) {
     Promotions.find({}, function (err, promotions) {
        if (err) throw err;
        res.json(promotions);
     });
})
.post(function (req, res, next) {
    Promotions.create(req.body, function (err, promotions) {
        if (err) throw err;
        console.log('Promotions created!');
        var id = promotions._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the promotions with id: ' + id);
    });
})
.delete(function(req, res, next){
      Promotions.remove({}, function (err, promotions) {
        if (err) throw err;
        res.json(promotions);
      });
});

promotionRouter.route('/:id')
.get(function(req,res,next){
      Promotions.findById(req.params.id, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
      });
})
.put(function(req, res, next){
      Promotions.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {
        new: true
      }, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
      });
})
.delete(function (req, res, next){
      Promotions.findByIdAndRemove(req.params.id, function (err, resp) {
        res.json(resp);
      });

});


module.exports = promotionRouter;