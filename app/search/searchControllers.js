(function(angular) {
    'use strict';
    var searchControllers = angular.module('searchControllers', ['ui.bootstrap', 'hSweetAlert', 'ngMaterial', 'Github.SearchApp.Directives', 'googlechart']);

    searchControllers
        .directive('searchResult', function() {
            return {
                restrict: 'E',
                scope: {
                    searchResult: '=',
                    searchModel: '=',
                    // showStatusReport: '&',
                    selectedIndex: '='
                },
                templateUrl: 'search/partials/searchview-template.html',
                controller: ['$scope', '$window', '$mdDialog', function($scope, $window, $mdDialog) {

                    $scope.showDetails = function(url) {
                        $window.open(url);
                    };

                    $scope.showStatusReport = function(ev, index) {
                        $mdDialog.show({
                            controller: DialogController,
                            templateUrl: 'search/partials/reportview-template.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            fullscreen: false, // $scope.customFullscreen, // Only for -xs, -sm breakpoints.
                            locals: {
                                item: $scope.searchResult.items[index]
                            }
                        });
                    };


                    function DialogController($scope, $mdDialog, item) {
                        //can be configured as general report  by passing required chart configuration
                        var statusReportChart = {};
                        statusReportChart.type = "PieChart";
                        statusReportChart.data = [
                            ['Category', 'Issue Count']
                        ];
                        statusReportChart.data.push(['Forks', item.forks_count]);
                        statusReportChart.data.push(['Stargazers', item.stargazers_count]);
                        statusReportChart.data.push(['Open Issues', item.open_issues_count]);
                        statusReportChart.data.push(['Watchers', item.watchers_count]);
                        statusReportChart.options = {
                            displayExactValues: false,
                            is3D: true,
                            chartArea: { left: 30, top: 10, bottom: 0, height: "100%" }
                        };

                        $scope.chart = statusReportChart;
                        $scope.hide = $mdDialog.hide;
                        $scope.cancel = $mdDialog.cancel;
                    }

                    DialogController.$inject = ['$scope', '$mdDialog', 'item'];
                }]
            };
        });

    searchControllers.controller('searchController', ['$scope', '$rootScope', 'RepoService', 'sweet', '$mdDialog', '$timeout', '$mdToast',

        function($scope, $rootScope, repoService, sweetAlert, $mdDialog, $timeout, $mdToast) {

            resetSearchCriteria();
            $scope.sortFilters = repoService.getSortByFilter();
            $scope.orderByFilters = repoService.getOrderByFilter();
            $scope.reportData = [];

            $scope.search = function() {
                if ($scope.searchModel.q === '') {
                    $mdToast.showSimple('Enter the search word for result...!');
                    return;
                }

                repoService.search($scope.searchModel).then(function(response) {
                        $scope.searchModel.pagination.totalItems = response.data.total_count;
                        $scope.searchResult.items = response.data.items;
                        if (response.data.total_count === 0) {
                            $mdToast.showSimple('No result found...!');
                        }
                        $rootScope.searchModel = $scope.searchModel;
                    })
                    .catch(function(ex) {
                        // resetSearchCriteria();
                        $scope.searchModel.pagination.currentPage = 1;
                    });
            };

            function resetSearchCriteria() {
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
            }

            if ($rootScope.searchModel !== undefined && $rootScope.searchModel.q !== '') {
                $scope.searchModel = $rootScope.searchModel;
                $scope.search();
            }
        }
    ]);
})(window.angular);