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