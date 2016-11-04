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