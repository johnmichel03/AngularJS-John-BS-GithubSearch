'use strict';

var reportApp = angular.module('ReportApp', ['ngRoute', 'ReportControllers']);

reportApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/report', {
            templateUrl: 'report/partials/reportIndex.html',
            controller: 'reportController'
        })
        .otherwise({ redirectTo: '/report' });
}]);