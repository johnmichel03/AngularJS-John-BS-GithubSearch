(function(angular) {
    var commonDirectives = angular.module('Github.CommonDirectives', []);

    commonDirectives.directive('gtKeyCode', gtKeyCode);
    //commonDirectives.directive('gtReport', gtReport);

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

    // function gtReport() {
    //     return {
    //         restrict: 'E',
    //         link: function($scope, $element, $attrs) {

    //         }
    //     };

    // }

})(window.angular);