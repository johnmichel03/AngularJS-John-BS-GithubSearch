(function(angular) {
    'use strict';

    var reportDirectives = angular.module('Github.SearchApp.Directives', []);
    reportDirectives.directive('issueReportgraph', issueReportGraph);

    function issueReportGraph() {
        return {
            scope: {
                reportData: '='
            },
            templateUrl: 'search/partials/reportview-template.html'
        };
    }
    
})(window.angular);