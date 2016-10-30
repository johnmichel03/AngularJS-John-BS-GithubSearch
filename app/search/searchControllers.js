'use strict';

var searchControllers = angular.module('searchControllers', []);

searchControllers.controller('searchController', ['$scope', 'RepoService', function($scope, repoService) {
    $scope.searchResult = { items: [], };
    $scope.paginationModel = { currentPage: 1, itemsPerPage: 10, maxSize: 10, totalItems: 0 };
    $scope.searchModel = { q: '', sort: '', order: 'desc' };

    $scope.sortFilters = repoService.getSortFilter();

    $scope.search = function() {
        repoService.search($scope.searchModel).then(function(response) {
            //$scope.searchResult.totalItems = response.data.total_count;
            $scope.paginationModel.totalItems = response.data.total_count;
            $scope.searchResult.items = response.data.items;
        });
    }

    $scope.showDetails = function(url) {
        if (!$window.confirm('Do you want to move away from this site???')) return;
        $window.location = url;
    }
}]);



var filters = angular.module('searchFiltersApp', [])
    .filter('lettersLimit', function() {
        return function(inputString, limitTo) {
            return inputString.slice(0, limitTo);
        }
    })