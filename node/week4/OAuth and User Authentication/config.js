/*
 config.js

 Global data reference about the application.
*/

module.exports = {
    'secretKey': '12345-67890-09876-54321', 
    'mongoUrl' : 'mongodb://localhost:27017/conFusion',
    'facebook': { 
    	clientID: '613785382113976', // facebook's application ID
    	clientSecret: '6cd8bad08b6da89f0b889e14c64f599b',// facebook's application secret
    	callbackURL: 'https://localhost:3443/users/facebook/callback' // log users in  and access  token
    }
}