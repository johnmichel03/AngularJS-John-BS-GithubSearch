(function(angular) {
    'use strict';

    var searchApp = angular.module('SearchApp', [
        'ngRoute',
        'searchControllers',
        'searchServices',
        'Github.CommonDirectives',
        'ngMaterial',
        'IssueControllers'
    ]);

    searchApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
                templateUrl: 'search/partials/searchindex.html',
                controller: 'searchController'
            })
            .when('/issue/:name*', {
                templateUrl: 'issue/partials/issue-index.html',
                controller: 'IssueController'
            })
            .otherwise({ redirectTo: '/search' });
    }]);

    // searchApp.run(function(bsLoadingOverlayService) {
    //     bsLoadingOverlayService.setGlobalConfig({
    //         templateUrl: 'loading-overlay-template.html'
    //     });
    // });

})(window.angular);