angular.module('confusionApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
                    // route for the home page
            .state('app', { // state name
                url:'/', 
                views: { // multiple views
                    'header': { // view name
                        templateUrl : 'views/header.html' 
                    },
                    'content': {
                        template : '<h1>To be Completed</h1>', // inline template
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
                    // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': { // nested in the content view
                        template: '<h1>To be Completed</h1>'
                   }
                }
            })
                    // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'
                     }
                }
            })

            // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id', // paramaters for menu 
                views: {
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'DishDetailController'
                   }
                }
            });
            $urlRouterProvider.otherwise('/'); // default routing for slash
    });