(function(angular) {
    'use strict';

    // Declare app level module which depends on views, and components
    var githubApp = angular.module('GithubApp', [
        'ngRoute',
        'Github.Interceptors',
        'SearchApp',
        'searchControllers',
        //'ReportApp',
        'ReportControllers'
    ])

    githubApp.config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider
                .when('/search', {
                    templateUrl: 'search/partials/searchindex.html',
                    controller: 'searchController'
                })
                .when('/report', {
                    templateUrl: 'report/partials/reportindex.html',
                    controller: 'reportController'
                })
                .otherwise({ redirectTo: '/search' });
        }
    ]);
    
    githubApp.config(['$httpProvider', function($httpProvider) {

        $httpProvider.interceptors.push('logInterceptors');
        $httpProvider.interceptors.push('responseInterceptor');

    }]);

})(window.angular)