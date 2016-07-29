'use strict';
/*
    https://docs.angularjs.org/api/ngResource/service/$resource
*/

angular.module('confusionApp')
  .constant('baseUrl', "http://localhost:3000/")
        .service('menuFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
    
    
            this.getDishes = function(){
              return $resource(baseUrl+"dishes/:id", null,  {'update':{method:'PUT' }});
            };

            this.getPromotions = function() {
                return $resource(baseUrl+'promotions/:id', {id: '@id'}); // If the parameter value is prefixed with @, then the value for that parameter will be extracted from the corresponding property on the data object
            };                                                           // @id -> value of :id 
                                                                         // @id -> {id: @id}
        }])


        /*
        factory('servicename', callback)
          service name, 
          service factory function - single object or function that represents the service to the rest of the application
        */
        .factory('corporateFactory', ['$resource', 'baseUrl', function($resource, baseUrl) { 
            var corpfac = {}; 
     
            corpfac.getLeaders = function() {
              return $resource(baseUrl+'leadership/:id', {id: '@id'});
            };

            return corpfac;
    
    
        }])

        .service('feedbackFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
            this.sendFeedback = function () {
            return $resource(baseUrl+'feedback/:id', {id: "@id"});
            }
        }])

;
