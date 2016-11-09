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
                // .when('/issue', {
                //     templateUrl: 'issue/partials/issue-index.html',
                //     controller: 'IssueController'
                // })
                .otherwise({ redirectTo: '/search' });
        }
    ]);

    githubApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('logInterceptors');
        $httpProvider.interceptors.push('responseInterceptor');
    }]);

})(window.angular);
(function(angular) {
    'use strict';
    var appConfigService = angular.module('appConfigServices', []);

    appConfigService.service('appUrlConfigService', function() {

        this.urlConfigSettings = {
            searchApiUrl: 'https://api.github.com/search',
            issueApiUrl: 'https://api.github.com/repos/'
        };

        this.getUrlConfigSettings = function() {
            return this.urlConfigSettings;
        };

    });

})(window.angular);
(function(angular) {
    'use strict';
    var githubInterceptors = angular.module('Github.Interceptors', ['hSweetAlert']);


    githubInterceptors.factory('logInterceptors', ['$log', function($log) {
        $log.debug('$log is injected with logInterceptors from Github.Interceptors module..!');

        var logInterceptor = function() {
            $log.log('empty logInterceptor function();');
        };
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
                    sweetAlert.show('Oops...', response.data.message, 'error');
                }
                return $q.reject(response);
            }
        };

        return responseInterceptor;
    }]);

})(window.angular);
(function(angular) {
    'use strict';
    var commonDirectives = angular.module('Github.CommonDirectives', []);
    commonDirectives.directive('gtKeyCode', gtKeyCode);

    function gtKeyCode() {
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs) {
                $element.bind("keypress", function(event) {
                    var keyCode = event.which || event.keyCode;

                    if (keyCode == $attrs.code) {
                        $scope.$apply(function() {
                            $scope.$eval($attrs.gtKeyCode, { $event: event });
                        });
                    }
                });
            }
        };
    }

})(window.angular);
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
(function(angular) {
    'use strict';

    var searchApp = angular.module('SearchApp', [
        'ngRoute',
        'searchControllers',
        'searchServices',
        'Github.CommonDirectives',
        'ngMaterial',
        'IssueControllers'
    ]);

    searchApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
                templateUrl: 'search/partials/searchindex.html',
                controller: 'searchController'
            })
            .when('/issue/:name*', {
                templateUrl: 'issue/partials/issue-index.html',
                controller: 'IssueController'
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
                            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
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

    searchControllers.controller('searchController', ['$scope', 'RepoService', 'sweet', '$mdDialog', '$timeout', '$mdToast',

        function($scope, repoService, sweetAlert, $mdDialog, $timeout, $mdToast) {

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
(function(angular) {
    'use strict';
    var issueControllers = angular.module('IssueControllers', ['IssueServices', 'ngMaterial']);
    issueControllers.controller('IssueController', ['$location', '$rootScope', '$scope', '$routeParams', 'IssueService',
        function($location, $rootScope, $scope, $routeParams, issueService) {

            $scope.repoName = $routeParams.name;
            $scope.selectedIndex = -1;
            $scope.issueResult = { items: [] };
            $scope.issueComments = { items: [] };
            $scope.issueModel = {
                repoName: $routeParams.name,
                commentUrl: '',
                sort: '',
                order: 'desc',
                pagination: {
                    currentPage: 1,
                    itemsPerPage: 30,
                    maxSize: 10,
                    totalItems: 0
                }
            };

            function getAllIssues() {

                issueService.getAllIssues($scope.issueModel).then(function(response) {
                        $scope.issueModel.pagination.totalItems = response.data.length;
                        $scope.issueResult.items = response.data;
                    })
                    .catch(function(ex) {
                        // resetSearchCriteria();
                        $scope.issueModel.pagination.currentPage = 1;
                    });
            }

            $scope.showComments = function(commentUrl, index) {

                $scope.issueModel.commentUrl = commentUrl;
                if ($scope.selectedIndex == index) {
                    $scope.selectedIndex = -1;
                    return;

                } else
                    $scope.selectedIndex = index;

                issueService.getAllCommentsById($scope.issueModel).then(function(response) {
                    $scope.issueComments.items = response.data;
                });
            };

            getAllIssues();
        }
    ]);

})(window.angular);
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
'use strict';

var reportApp = angular.module('ReportApp', ['ngRoute', 'ReportControllers']);

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