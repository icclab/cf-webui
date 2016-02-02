angular.module('app.service').factory('serviceService', ['$http', function($http) {
  var serviceServiceFactory = {};

  var _getServicePlansForTheService = function(serviceId) {
    // params
    var url = '/v2/services/' + serviceId + '/service_plans';
    var params = {
      'inline-relations-depth': 1
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

    return $http.get(url, config);
  };

  var _getServices= function(id) {
    // params
    var url = '/v2/services';
    var params = {
      'inline-relations-depth': 1
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

    return $http.get(url, config);
  };

  serviceServiceFactory.getServicePlansForTheService = _getServicePlansForTheService;
  serviceServiceFactory.getServices = _getServices;

  return serviceServiceFactory;
}]);