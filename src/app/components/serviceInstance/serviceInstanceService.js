angular.module('app.serviceInstance').factory('serviceInstanceService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var serviceInstanceServiceFactory = {};

  var _addServiceInstance = function(serviceInstance) {
    
    var url = '/v2/service_instances';

    // data
    var data = {
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

    return $http.post(url, data, config);
  };

  var _deleteServiceInstance = function(serviceInstanceId) {
    
    var url = '/v2/service_instances/' + serviceInstanceId;

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

  var _getServiceBindingsForServiceInstance= function(serviceInstanceId) {
    // params
    var url = '/v2/service_instances/' + serviceInstanceId + '/service_bindings';

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

  serviceInstanceServiceFactory.addServiceInstance = _addServiceInstance;
  serviceInstanceServiceFactory.deleteServiceInstance = _deleteServiceInstance;
  serviceInstanceServiceFactory.getServiceBindingsForServiceInstance = _getServiceBindingsForServiceInstance;

  return serviceInstanceServiceFactory;
}]);