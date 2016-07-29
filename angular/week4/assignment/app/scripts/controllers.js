'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";

            // query: {method:'GET', isArray:true} - Return a json-object array
            menuFactory.getDishes().query(function (response) {// the response argumemnt - the body of HTTP message
                $scope.dishes = response; 
                $scope.showMenu = true;
            }, function (response) { // the response argument - the entire HTTP message
                $scope.message = "Error: "+response.status + " " + response.statusText;
            });

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            //$scope.showFb = true;
            //$scope.massage = "Submit correctly."

            $scope.sendFeedback = function() {
                $scope.feedback.id = null;
    
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) { // when the div contained select input is show & select options is not selected
                    $scope.invalidChannelSelection = true;                         // show error message.
                } else {
                    var Fb = feedbackFactory.sendFeedback();
                    var newFb = new Fb($scope.feedback);
                    newFb.$save();

                    feedbackFactory.sendFeedback().query(function () {

                    });

                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                   // console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            $scope.showDish = false;
            $scope.message="Loading ...";
            
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                          .$promise.then(function (response) { // Support $promise object
                            $scope.dish = response;
                            $scope.showDish = true;
                          }, function (response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                          });
 
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish); // request to the server to update the dish object
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) { // for home.html

            
            $scope.showDish =$scope.showPromotions =$scope.showLeader = true;
            $scope.dishMsg=$scope.promotionMsg =$scope.leaderMsg ="Loading ...";
            /* $resource object method is an empty reference(no need to initialize $scope.dish), 
               then $scope.dish is populated with the data returned from the server(no need to use callback to pppulate the data).
            */
            $scope.dish = menuFactory.getDishes().get({id: 0}) 
                          .$promise.then(function (response) {
                                $scope.dish = response;
                                $scope.showDish = true;
                          }, function (response) {
                                $scope.showDish = false;
                                $scope.dishMsg = "Error: "+response.status + " " + response.statusText;
                          });

            $scope.promotions = menuFactory.getPromotions()
                                .get({id: 0}).$promise.then(function (response) {
                                    $scope.promotions = response;
                                    $scope.showPromotions = true;
                                }, function (response) {
                                    $scope.showPromotions = false;
                                    $scope.promotionMsg =  "Error: "+response.status + " " + response.statusText;
                                }); 
 
            $scope.leader = corporateFactory.getLeaders()
                            .get({id: 0}).$promise.then(function (response) {
                                $scope.leader = response;
                                $scope.showLeader = true;
                            }, function (response) {
                                $scope.showLeader = false;
                                $scope.leaderMsg = "Error: "+response.status + " " + response.statusText;
                            });

        }]).

        controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) { // for aboutus.html
            $scope.leadersMsg = 'Loading';
            $scope.showLeaders = true;

            $scope.leaders = corporateFactory.getLeaders()
                             .query(function (response) { // retrieve a collection from the server
                                $scope.leaders = response;
                                $scope.showLeaders = true;
                             }, function (response) {
                                $scope.showLeaders = false;
                                $scope.leadersMsg = "Error: "+response.status + " " + response.statusText;
                             });
        }])

        


;
