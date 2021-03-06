'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('github app', function() {


    it('should automatically redirect to /search when location hash/fragment is empty', function() {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch("/search");
    });


    describe('search', function() {

        beforeEach(function() {
            browser.get('index.html#!/search');
        });


        it('should render view1 when user navigates to /search', function() {
            expect(element.all(by.css('[ng-view] p')).first().getText()).
            toMatch(/partial for search/);
        });

    });

});