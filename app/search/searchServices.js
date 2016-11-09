(function(angular) {
    'use strict';
    var searchServices = angular.module('searchServices', ['appConfigServices']);

    searchServices.service('RepoService', ['$http', '$q', 'appUrlConfigService', function($http, $q, urlConfig) {
        var baseurl = urlConfig.getUrlConfigSettings().searchApiUrl;

        this.search = function(searchModel) {
            return $http({
                method: 'GET',
                url: baseurl + '/repositories',
                params: {
                    q: searchModel.q,
                    order: searchModel.order,
                    sort: searchModel.sort,
                    page: searchModel.pagination.currentPage,
                    per_page: searchModel.pagination.itemsPerPage,
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