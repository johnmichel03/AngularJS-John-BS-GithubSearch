(function(angular) {
    'use strict';

    // Declare app level module which depends on views, and components
    var githubApp = angular.module('GithubApp', [
        'ngRoute',
        'Github.Interceptors',
        'SearchApp',
        'searchControllers',
        'ReportControllers',
        'ngMaterial'
    ]);

    githubApp.config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider
                .when('/search', {
                    templateUrl: 'search/partials/searchindex.html',
                    controller: 'searchController'
                })
                .when('/report', {
                    templateUrl: 'report/partials/reportindex.html',
                    controller: 'reportController'
                })
                .otherwise({ redirectTo: '/search' });
        }
    ]);

    githubApp.config(['$httpProvider', function($httpProvider) {

        $httpProvider.interceptors.push('logInterceptors');
        $httpProvider.interceptors.push('responseInterceptor');

    }]);

})(window.angular);
'use strict';

var reportApp = angular.module('ReportApp', ['ngRoute', 'ReportControllers', 'ngMaterial']);

reportApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/report', {
            templateUrl: 'report/partials/reportIndex.html',
            controller: 'reportController'
        })
        .otherwise({ redirectTo: '/report' });
}]);
'use strict';
var reportControllers = angular.module('ReportControllers', ['ngMaterial']);

reportControllers.controller('reportController', ['$scope', '$mdDialog', function($scope, $mdDialog) {
    $scope.status = '  ';
    $scope.customFullscreen = false;

    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'loading-overlay-template', // 'dialog1.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    $scope.showPrerenderedDialog = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            contentElement: '#myDialog',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };


    function DialogController($scope, $mdDialog) {
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

}]);
(function(angular) {
    'use strict';
    var reportServices = angular.module('ReportServices', []);

})(window.angular);
(function(angular) {
    'use strict';

    var searchApp = angular.module('SearchApp', [
        'ngRoute',
        'searchControllers',
        'searchServices',
        'Github.CommonDirectives',
        'ngMaterial'
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
(function(angular) {
    'use strict';
    var searchControllers = angular.module('searchControllers', ['ui.bootstrap', 'hSweetAlert', 'ngMaterial']);

    searchControllers.controller('searchController', ['$scope', '$q', '$window', 'RepoService', 'sweet', '$mdDialog',
        function($scope, $q, $window, repoService, sweetAlert, $mdDialog) {

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

            $scope.status = '  ';
            $scope.customFullscreen = false;

            $scope.showAdvanced = function(ev) {
                $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'loading-overlay-template', // 'dialog1.tmpl.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                    })
                    .then(function(answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };

            // $scope.showPrerenderedDialog = function(ev) {
            //     $mdDialog.show({
            //         controller: DialogController,
            //         contentElement: '#myDialog',
            //         parent: angular.element(document.body),
            //         targetEvent: ev,
            //         clickOutsideToClose: true
            //     });
            // };


            function DialogController($scope, $mdDialog) {
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

})(window.angular);
(function(angular) {
    'use strict';
    var githubInterceptors = angular.module('Github.Interceptors', ['hSweetAlert']);


    githubInterceptors.factory('logInterceptors', ['$log', function($log) {
        $log.debug('$log is injected with logInterceptors from Github.Interceptors module..!');

        var logInterceptor = function() {
            $log.log('empty logInterceptor function();');
        }
        return logInterceptor;
    }]);


    githubInterceptors.factory('requestInterceptors', [function() {
        var requestInterceptor = {
            request: function(config) {
                var deferred = $q.defer();
                return deferred.promise;
            }
        };
        return requestInterceptor;
    }]);

    githubInterceptors.service('responseInterceptor', ['$q', 'sweet', function($q, sweetAlert) {
        var responseInterceptor = {
            // response: function(response) {
            //     var deferred = $q.defer();
            //     deferred.resolve(response);
            //     return deferred.promise;
            // },
            responseError: function(response) {

                if (response.status !== 200 && response.status !== 404) {
                    //location.reload();
                    sweetAlert.show('Oops...', response.data.message, 'error');
                }
                return $q.reject(response);
            }
        };

        return responseInterceptor;
    }]);

})(window.angular)