(function(angular) {
    'use strict';
    var issueServices = angular.module('IssueServices', ['appConfigServices']);

    issueServices.service('IssueService', ['$http', '$q', 'appUrlConfigService', function($http, $q, urlConfig) {
        var baseUrl = urlConfig.getUrlConfigSettings().issueApiUrl;

        this.getAllIssues = function(searchModel) {
            return $http({
                method: 'GET',
                url: baseUrl + searchModel.repoName + '/issues',
                params: {
                    order: searchModel.order,
                    sort: searchModel.sort,
                    page: searchModel.pagination.currentPage,
                    per_page: searchModel.pagination.itemsPerPage
                }
            });
        };

        this.getAllCommentsById = function(searchModel) {
            return $http({
                method: 'GET',
                url: searchModel.commentUrl,
                params: {
                    order: searchModel.order,
                    sort: searchModel.sort,
                    page: searchModel.pagination.currentPage,
                    per_page: searchModel.pagination.itemsPerPage
                }
            });
        };

    }]);

})(window.angular);