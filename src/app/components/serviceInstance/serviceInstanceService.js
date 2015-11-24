angular.module('app.serviceInstance').factory('serviceInstanceService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var serviceInstanceServiceFactory = {};

  var _addServiceInstance = function(serviceInstance) {
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/service_instances',
      'name': serviceInstance.name,
      'service_plan_guid': serviceInstance.servicePlanId,
      'space_guid': serviceInstance.spaceId
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.post('/request.php', data, config);
  };

  var _deleteServiceInstance = function(serviceInstanceId) {
    
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/service_instances/' + serviceInstanceId
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

  var _getServiceBindingsForServiceInstance= function(serviceInstanceId) {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/service_instances/' + serviceInstanceId + '/service_bindings',
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

  serviceInstanceServiceFactory.addServiceInstance = _addServiceInstance;
  serviceInstanceServiceFactory.deleteServiceInstance = _deleteServiceInstance;
  serviceInstanceServiceFactory.getServiceBindingsForServiceInstance = _getServiceBindingsForServiceInstance;

  return serviceInstanceServiceFactory;
}]);