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
  
  var _getServiceBindings = function(id) {
    
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/apps/' + id + '/service_bindings',
      'inline-relations-depth': 1
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
  
  var _editApplication = function(application) {
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/apps/' + application.id,
      'name': application.name
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.put('/request.php', data, config).success(function(response) {
      // TODO: error handling
    }).error(function(err, status) {
      // TODO: error handling
    });
  };
  
  var _deleteApplication = function(application) {
    console.log("hier2dfasdf");
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/apps/' + application.id,
      'guid' : application.id
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
    
    return $http.delete('/request.php', config).success(function(response) {
      // TODO: error handling
    }).error(function(err, status) {
      // TODO: error handling
    });
  };
  
  applicationServiceFactory.getApplicationSummary = _getApplicationSummary;
  applicationServiceFactory.getStack = _getStack;
  applicationServiceFactory.getEnvironmentVariables = _getEnvironmentVariables;
  applicationServiceFactory.getServiceBindings = _getServiceBindings;
  applicationServiceFactory.editApplication = _editApplication;
  applicationServiceFactory.deleteApplication = _deleteApplication;
  
  return applicationServiceFactory;
}]);