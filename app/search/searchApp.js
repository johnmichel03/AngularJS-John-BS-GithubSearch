(function(angular) {
    'use strict';

    var searchApp = angular.module('SearchApp', [
        'ngRoute',
        'searchControllers',
        'searchServices',
        'Github.CommonFilters'
    ]);

    searchApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
                templateUrl: 'search/partials/searchindex.html',
                controller: 'searchController'
            })
            .otherwise({ redirectTo: '/search' });
    }]);

})(window.angular);