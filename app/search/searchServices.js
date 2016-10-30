var searchServices = angular.module('searchServices', []);

searchServices.service('RepoService', ['$http', '$q', function($http, $q) {
    var baseurl = 'https://api.github.com/search/'; //https://api.github.com/search/'; //issues?q=repo:twbs/bootstrap

    this.search = function(searchModel) {
        return $http.get(baseurl + 'repositories?q=' + searchModel.q + '&sort=' + searchModel.sort + '&order=' + searchModel.order);
    }

    this.getSortFilter = function() {

        return [{ name: 'Best Match', value: '' }, { name: 'Stars', value: 'stars' }, { name: 'Forks', value: 'forks' }, { name: 'Updated', value: 'updated' }];
    }

}]);