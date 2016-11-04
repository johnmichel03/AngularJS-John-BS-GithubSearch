(function(angular) {
    'use strict';
    var searchControllers = angular.module('searchControllers', ['ui.bootstrap', 'hSweetAlert', 'ngMaterial', 'Github.SearchApp.Directives']);

    searchControllers.controller('searchController', ['$scope', '$q', '$window', 'RepoService', 'sweet', '$mdDialog',
        function($scope, $q, $window, repoService, sweetAlert, $mdDialog) {

            // var data = google.visualization.arrayToDataTable([
            //     ['Element', 'Density', { role: 'style' }],
            //     ['Copper', 8.94, '#b87333'], // RGB value
            //     ['Silver', 10.49, 'silver'], // English color name
            //     ['Gold', 19.30, 'gold'],
            //     ['Platinum', 21.45, 'color: #e5e4e2'], // CSS-style declaration
            // ]);


            $scope.name = 'john michel 123455';

            //  $scope.reportData.name = 'john michel 123455';

            resetSearchCriteria();
            $scope.sortFilters = repoService.getSortByFilter();
            $scope.orderByFilters = repoService.getOrderByFilter();

            $scope.search = function() {
                //  bsLoadingOverlayService.start();
                repoService.search($scope.searchModel).then(function(response) {
                        $scope.searchModel.pagination.totalItems = response.data.total_count;
                        $scope.searchResult.items = response.data.items;
                        // bsLoadingOverlayService.stop();
                    })
                    .catch(function(ex) {
                        resetSearchCriteria();
                    });
            };

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



            $scope.status = '';
            $scope.customFullscreen = false;

            $scope.showAdvanced = function(ev) {
                $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'search/partials/reportview-template.html', // 'dialog1.tmpl.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
                        locals: {
                            items: $scope.searchResult.items
                        }
                    })
                    // .then(function(answer) {
                    //     $scope.status = 'You said the information was "' + answer + '".';
                    // }, function() {
                    //     $scope.status = 'You cancelled the dialog.';
                    // });
            };

            function DialogController($scope, $mdDialog, items) {
                $scope.items = items;

                $scope.hide = function() {
                    $mdDialog.hide();
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }

        }
    ]);
})(window.angular);