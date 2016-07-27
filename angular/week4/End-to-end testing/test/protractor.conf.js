exports.config = {
  allScriptsTimeout: 11000, // the timeout for the script files
  specs: [ // the root location of all e2e test files
    'e2e/*.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:3004/app/', // where the app can be access 
 
  framework: 'jasmine',
  directConnect: true, // directConnect option to directly connect to the browser to conduct the tests, rather than through the Selenium web server.

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000 // the timeout for the server
  }
};