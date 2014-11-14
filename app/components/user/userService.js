angular.module('app.user').factory('userService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var userServiceFactory = {};

  var _getUserSummary = function(id) {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/users/' + id
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      params: params,
      headers: headers
    };

    return $http.get('/request.php', config).then(function(response) {
      return response;
    });
  };

  userServiceFactory.getUserSummary = _getUserSummary;
  
  return userServiceFactory;
}]);