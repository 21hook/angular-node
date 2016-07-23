/*
    https://github.com/auth0/node-jsonwebtoken
    JWT(JSON Web Token) node module (https://tools.ietf.org/html/rfc7519)
*/
var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, { // Sign and issue an token
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];


    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {// Verify and decode an token 
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = function (req, res, next) {
    if (!req.decoded._doc.admin) {
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }

    next();
}