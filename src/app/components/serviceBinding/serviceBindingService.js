angular.module('app.serviceBinding').factory('serviceBindingService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var serviceBindingServiceFactory = {};
  
  var _addServiceBinding = function(serviceBinding) {
    
    var url = '/v2/service_bindings';

    // data
    var data = {
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

    return $http.post(url, data, config);
  };

  var _deleteServiceBinding = function(serviceBindingId) {
    
    var url = '/v2/service_bindings/' + serviceBindingId;

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.delete(url, config);
  };
  
  serviceBindingServiceFactory.addServiceBinding = _addServiceBinding;
  serviceBindingServiceFactory.deleteServiceBinding = _deleteServiceBinding;
  
  return serviceBindingServiceFactory;
}]);