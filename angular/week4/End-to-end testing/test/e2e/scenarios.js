'use strict';

/*
	Details for protractor for angular based on selenium 
	for angular: APIs for angular 
	based on selenium: APIs from selenium
	---------------
	|Angualr tests|
	---------------
	| Profactor   |
	---------------
	| Selenium    |
	-------------

	http://www.protractortest.org/#/api
*/
describe('conFusion App E2E Testing', function() {

	it('should automatically redirect to / when location hash/fragment is empty', function() {

		browser.get('index.html#/');  // get the index.html from the baseUrl
		// toMatch: match regular expressions in Jasmine  http://jasmine.github.io/2.3/introduction.html
		expect(browser.getLocationAbsUrl()).toMatch("/"); // getLocationAbsUrl: 
														  // 	Returns the current absolute url
														  // i.e. http://angular.github.io/protractor/#/api
														  // 	  http://localhost:3004/app/index.html
  });

});

describe('index', function() {
	beforeEach(function() {
	  browser.get('index.html#/');
	});

	it('should have a title', function() {
	  expect(browser.getTitle()).
	    toEqual('Ristorante Con Fusion');
	});
});

describe('menu 0 item', function() {
    beforeEach(function() {
      browser.get('index.html#/menu/0');
    });

    it('should have a name', function() {
          var name = element(by.binding('dish.name')); // Extract the element bound to dish.name
          expect(name.getText()). 
             toEqual('Uthapizza Hot $4.99');
    });

    it('should show the number of comments as', function() {
         expect(element.all(by.repeater('dishDesc in dish.comments')) // Find elements inside an ng-repeat, and get an array of elements
            .count()).toEqual(5);

    });

    it('should show the first comment author as', function() {
          element(by.model('dishComment.query')).sendKeys('author'); // Find an element by ng-model expression
            expect(element.all(by.repeater('dishDesc in dish.comments')) // sendKey: simulate standard input
            .count()).toEqual(5);
          var author = element.all(by.repeater('dishDesc in dish.comments')) // five elements -> the child element of the five
                      .first().element(by.binding('dishDesc.author'));

          expect(author.getText()).toContain('25 Cent');

    }); 
 });  
