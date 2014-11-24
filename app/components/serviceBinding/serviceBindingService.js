angular.module('app.serviceBinding').factory('serviceBindingService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var serviceBindingServiceFactory = {};
  
  var _addServiceBinding = function(serviceBinding) {
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/service_bindings',
      'service_instance_guid': serviceBinding.serviceInstanceId,
      'app_guid': serviceBinding.applicationId
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.post('/request.php', data, config).success(function(response) {
      // TODO: error handling
    }).error(function(err, status) {
      // TODO: error handling
    });
  };

  var _deleteServiceBinding = function(serviceBindingId) {
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/service_bindings/' + serviceBindingId
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
  
  serviceBindingServiceFactory.addServiceBinding = _addServiceBinding;
  serviceBindingServiceFactory.deleteServiceBinding = _deleteServiceBinding;
  
  return serviceBindingServiceFactory;
}]);