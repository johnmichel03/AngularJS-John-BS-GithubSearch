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