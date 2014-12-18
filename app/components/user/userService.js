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

    return $http.get('/request.php', config);
  };
  
  var _deleteUser = function(user) {
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/users/' + user.metadata.guid,
      'guid' : user.metadata.guid,
      'async' : false
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      data: data
    };
    
    return $http.delete('/request.php', config);
  };

  userServiceFactory.getUserSummary = _getUserSummary;
  userServiceFactory.deleteUser = _deleteUser;
  
  return userServiceFactory;
}]);