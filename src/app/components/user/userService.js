angular.module('app.user').factory('userService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var userServiceFactory = {};

  var _getUserSummary = function(id) {
    
    var url = '/v2/users/' + id;

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.get(url, config);
  };
  
  var _deleteUser = function(user) {
    
    var url = '/v2/users/' + user.metadata.guid;

    // data
    var data = {
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
    
    return $http.delete(url, config);
  };

  userServiceFactory.getUserSummary = _getUserSummary;
  userServiceFactory.deleteUser = _deleteUser;
  
  return userServiceFactory;
}]);