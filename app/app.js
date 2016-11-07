(function(angular) {
    'use strict';

    // Declare app level module which depends on views, and components
    var githubApp = angular.module('GithubApp', [
        'ngRoute',
        'Github.Interceptors',
        'SearchApp',
        'searchControllers',
        'ReportControllers',
        'ngMaterial'
        //'IssueControllers'
    ]);

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
                // .when('/issue', {
                //     templateUrl: 'issue/partials/issue-index.html',
                //     controller: 'IssueController'
                // })
                .otherwise({ redirectTo: '/search' });
        }
    ]);

    githubApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('logInterceptors');
        $httpProvider.interceptors.push('responseInterceptor');
    }]);

})(window.angular);