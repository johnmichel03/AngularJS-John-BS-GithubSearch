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
                    }

                    $scope.showStatusReport = function(ev, index) {
                        $mdDialog.show({
                            controller: DialogController,
                            templateUrl: 'search/partials/reportview-template.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
                            locals: {
                                item: $scope.searchResult.items[index]
                            }
                        })
                    };


                    function DialogController($scope, $mdDialog, item) {

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
                        // $scope.answer = function(answer) {
                        //     $mdDialog.hide(answer);
                        // };
                    }

                    DialogController.$inject = ['$scope', '$mdDialog', 'item'];
                }]
            };
        });

    searchControllers.controller('searchController', ['$scope', 'RepoService', 'sweet', '$mdDialog', '$timeout',
        function($scope, repoService, sweetAlert, $mdDialog, $timeout) {

            resetSearchCriteria();
            $scope.sortFilters = repoService.getSortByFilter();
            $scope.orderByFilters = repoService.getOrderByFilter();
            $scope.reportData = [];
            $scope.search = function() {
                repoService.search($scope.searchModel).then(function(response) {
                        $scope.searchModel.pagination.totalItems = response.data.total_count;
                        $scope.searchResult.items = response.data.items;
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

        }
    ]);
})(window.angular);