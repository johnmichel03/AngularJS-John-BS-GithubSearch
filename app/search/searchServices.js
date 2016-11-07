(function(angular) {
    'use strict';

    var searchServices = angular.module('searchServices', []);

    searchServices.service('RepoService', ['$http', '$q', function($http, $q) {
        var baseurl = 'https://api.github.com/search/'; //https://api.github.com/search/'; //issues?q=repo:twbs/bootstrap

        this.search = function(searchModel) {
            return $http({
                method: 'GET',
                url: baseurl + 'repositories',
                params: {
                    q: searchModel.q,
                    order: searchModel.order,
                    sort: searchModel.sort,
                    page: searchModel.pagination.currentPage,
                    pageSize: searchModel.pagination.itemsPerPage,
                }
            });
        };

        this.getSortByFilter = function() {
            return [{ name: 'Best Match', value: '' }, { name: 'Stars', value: 'stars' }, { name: 'Forks', value: 'forks' }, { name: 'Updated', value: 'updated' }];
        };

        this.getOrderByFilter = function() {
            return [{ name: 'Ascending', value: 'asc' }, { name: 'Decending', value: 'desc' }];
        };

    }]);



    searchServices.service('IssueService', ['$http', '$q', function($http, $q) {
        var baseurl = 'https://api.github.com/repos/lxn/win/issues/'; //https://api.github.com/search/'; //issues?q=repo:twbs/bootstrap

        this.search = function(searchModel) {
            return $http({
                method: 'GET',
                url: baseurl,
                params: {
                    q: searchModel.q,
                    order: searchModel.order,
                    sort: searchModel.sort,
                    page: searchModel.pagination.currentPage,
                    pageSize: searchModel.pagination.itemsPerPage,
                }
            });
        };

        this.getSortByFilter = function() {
            return [{ name: 'Best Match', value: '' }, { name: 'Stars', value: 'stars' }, { name: 'Forks', value: 'forks' }, { name: 'Updated', value: 'updated' }];
        };

        this.getOrderByFilter = function() {
            return [{ name: 'Ascending', value: 'asc' }, { name: 'Decending', value: 'desc' }];
        };

    }]);

})(window.angular);