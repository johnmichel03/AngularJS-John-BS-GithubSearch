(function(angular) {
    'use strict';

    var searchApp = angular.module('SearchApp', [
        'ngRoute',
        'searchControllers',
        'searchServices',
        'Github.CommonDirectives',
        'ngMaterial'
        //'Github.ReportApp.Directives'
    ]);

    searchApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
                templateUrl: 'search/partials/searchindex.html',
                controller: 'searchController'
            })
            .otherwise({ redirectTo: '/search' });
    }]);

    // searchApp.run(function(bsLoadingOverlayService) {
    //     bsLoadingOverlayService.setGlobalConfig({
    //         templateUrl: 'loading-overlay-template.html'
    //     });
    // });

})(window.angular);