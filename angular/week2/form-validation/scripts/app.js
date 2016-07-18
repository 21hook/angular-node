'use strict';

var app = angular.module('confusionApp', []); // Refer to that module|app 'confusionApp'

app.controller('menuCotroller', ['$scope', function($scope) { // Refer to the object of the root scope of Angualr into the app.controller, and pass it into the menuController initialization's function.
    $scope.tab = 1;
    var dishes=[
                 {
                   name:'Uthapizza',
                   image: 'images/uthapizza.png',
                   category: 'mains',
                   label:'Hot',
                   price:'4.99',
                   description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
                   comment: ''
                },
                {
                   name:'Zucchipakoda',
                   image: 'images/zucchipakoda.png',
                   category: 'appetizer',
                   label:'',
                   price:'1.99',
                   description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
                   comment: ''
                },
                {
                   name:'Vadonut',
                   image: 'images/vadonut.png',
                   category: 'appetizer',
                   label:'New',
                   price:'1.99',
                   description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
                   comment: ''
                },
                {
                   name:'ElaiCheese Cake',
                   image: 'images/elaicheesecake.png',
                   category: 'dessert',
                   label:'',
                   price:'2.99',
                   description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
                   comment: ''
                }
                ];

    $scope.dishes = dishes; // Attach it to the $scope as a property of object.
    $scope.filterText = '';
    $scope.select = function (setTab) {
        this.tab = setTab; // Upda

        /* Add value for the object to filter on a tag */
        if (setTab === 2) {
            this.filterText = "appetizer"; }
        else if (setTab === 3) {
            this.filterText = "mains"; }
        else if (setTab === 4) {
            this.filterText = "dessert"; }
        else {
            this.filterText = ""; }
    };  // JS will automatically add ; after the end of a new line. So that's OK you miss it, but you'd better add it.

    $scope.isSelected = function (checkTab) {
        return (this.tab === checkTab);
    };


    $scope.showDetails = false; // The value of this property is for the ng-sow directive in the menu.html

    $scope.toggleDetails = function() { // This function is for the ng-click directive of the button below right of the div.col-xs-12.
      $scope.showDetails = !$scope.showDetails;
    };
}]);

app.controller('ContactControler', ['$scope', function($scope) { // Add the controller to the module 'confusionApp'.
  var channels = [{
    value: "tel",
    label: "Tel."
  }, {
    value: "Email",
    label: "Email"
  }];

  $scope.feedback = {
    mychannel:"",
    firstName:"",
    lastName:"",
    agree:false,
    email:""
  };
  $scope.channels = channels;
  $scope.invalidChannleSelection = false;

}]);

app.controller('FeedbackController', ['$scope', function($scope) { // Refer to the global object of Angualr.
  $scope.sendFeedback = function () {
    console.log($scope.feedback);

    if($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
      $scope.invalidChannelSelection = true;
      console.log('incorrect');
    } else {
      $scope.invalidChannelSelection = false;
      $scope.feedback = {
        mychannel:"",
        firstName:"",
        lastName:"",
        agree:false, email:""
      };

      $scope.feedback.mychannel="";
      $scope.feedbackForm.$setPristine();
      console.log($scope.feedback);
    }

  }

}]);

