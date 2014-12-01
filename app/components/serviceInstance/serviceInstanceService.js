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

    return $http.post('/request.php', data, config).success(function(response) {
      // TODO: error handling
    }).error(function(err, status) {
      // TODO: error handling
    });
  };

  serviceInstanceServiceFactory.addServiceInstance = _addServiceInstance;

  return serviceInstanceServiceFactory;
}]);