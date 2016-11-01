(function(angular) {
    'use strict';
    var searchControllers = angular.module('searchControllers', ['ui.bootstrap', 'hSweetAlert']);

    searchControllers.controller('searchController', ['$scope', '$q', '$window', 'RepoService', 'sweet',
        function($scope, $q, $window, repoService, sweetAlert) {

            $scope.searchResult = { items: [] };
            $scope.searchModel = {
                q: '',
                sort: '',
                order: 'desc',
                pagination: {
                    currentPage: 1,
                    itemsPerPage: 30,
                    maxSize: 10,
                    totalItems: 0
                }
            };
            $scope.sortFilters = repoService.getSortByFilter();
            $scope.orderByFilters = repoService.getOrderByFilter();

            $scope.search = function() {
                repoService.search($scope.searchModel).then(function(response) {
                        $scope.searchModel.pagination.totalItems = response.data.total_count;
                        $scope.searchResult.items = response.data.items;
                    })
                    .catch(function(ex) {
                        $scope.searchModel.pagination.currentPage = 1;
                    });
            }

            $scope.showDetails = function(url) {
                sweetAlert.show({
                    title: 'Confirm',
                    text: 'Do you want to move away from this site?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes',
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function(isConfirm) {
                    if (isConfirm) {
                        $window.location = url;
                    } else {
                        return;
                    }
                });
            }
        }

    ]);
})(window.angular);