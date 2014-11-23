angular.module('app.application').factory('applicationService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var applicationServiceFactory = {};
  
  var _getApplicationSummary = function(id) {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/apps/' + id + '/summary'
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
  
  var _getStack = function(id) {
    
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/stacks/' + id,
      'guid' : id
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      params: params
    };

    return $http.get('/request.php', config).then(function(response) {
      return response;
    });
  };
  
  var _getEnvironmentVariables = function(id) {
    
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/apps/' + id + '/env'
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      params: params
    };

    return $http.get('/request.php', config).then(function(response) {
      return response;
    });
  };
  
  applicationServiceFactory.getApplicationSummary = _getApplicationSummary;
  applicationServiceFactory.getStack = _getStack;
  applicationServiceFactory.getEnvironmentVariables = _getEnvironmentVariables;
  
  return applicationServiceFactory;
}]);