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