/*
	Since describe and it blocks are functions, 
	they can contain any executable code necessary to implement the test. 

	http://jasmine.github.io/2.3/introduction.html
	https://docs.angularjs.org/guide/unit-testing
*/

describe('Controller of MenuController to be tested.', function () { // a string - descriptions abouting testing
	
	// Use the module method provided by ngMock to load the module. 
	beforeEach(module('confusionApp')); // run code before each test -- Jasmine provides

	var MenuController, scope, $httpBackend;

	// Use the "inject" method that ngMock module provide configured in the file property in the karma.conf.js. 
  	// Inject the $object provided by ngMock module.
	beforeEach(inject(function ($controller, _$httpBackend_,  $rootScope, menuFactory) {

		// place here mocked dependencies
		$httpBackend = _$httpBackend_;

		/* Simulate a HTTP request from the services file using DI */
		$httpBackend.expectGET("http://localhost:3000/dishes").respond([
			{
			"id": 0,
			"name": "Uthapizza",
			"image": "images/uthapizza.png",
			"category": "mains",
			"label": "Hot",
			"price": "4.99",
			"description": "A",
			"comments":[{}]
			},
			{
			"id": 1,
			"name": "Zucchipakoda",
			"image": "images/zucchipakoda.png",
			"category": "mains",
			"label": "New",
			"price": "4.99",
			"description": "KFC",
			"comments":[{}]
			}
		]);
		/*------------End of simulation-------------*/

		scope = $rootScope.$new(); // Newly created scope

		MenuController = $controller('MenuController', { // Instantiate a controller by retriving | constructing newly.
			$scope: scope, 
			menuFactory: menuFactory // - The string can use the controller as property syntax. the scope must be injected into locals param for this to work correctly. 
		});							 // i.e. scope.MenuController
		$httpBackend.flush(); // Explicitly flush pending requests and allow the test to execute synchronously(avoid responds to requests asynchronously)
							  // https://docs.angularjs.org/api/ngMock/service/$httpBackend
	}));

	// Variables declared in a describe are available to any it block
	// Each individual test now only contains the code specific to that test
	it('should have showDetails as false', function () {

		expect(scope.showDetails).toBeFalsy();

	});

	it('should create "dishes" with 2 dishes fetched from xhr', function(){

	  expect(scope.showMenu).toBeTruthy();
	  expect(scope.dishes).toBeDefined();
	  expect(scope.dishes.length).toBe(2);

	});

	it('should have the correct data order in the dishes', function() {

	  expect(scope.dishes[0].name).toBe("Uthapizza");
	  expect(scope.dishes[1].label).toBe("New");

	});

	it('should change the tab selected based on tab clicked', function(){

	  expect(scope.tab).toEqual(1);

	  scope.select(3);

	  expect(scope.tab).toEqual(3);
	  expect(scope.filtText).toEqual('mains');

	});

});