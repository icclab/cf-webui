angular.module('app.service').factory('serviceService', ['$http', function($http) {
  var serviceServiceFactory = {};

  var _getServicePlans = function(serviceId) {
    // params
    var url = '/v2/service_plans';

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

  var _getServicePlanForTheService = function(servicePlanId) {
    // params
    var url = '/v2/service_plans/' + servicePlanId;
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

  var _getService= function(id) {
    // params
    var url = '/v2/services/' + id;
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

  serviceServiceFactory.getServicePlans = _getServicePlans;
  serviceServiceFactory.getServicePlansForTheService = _getServicePlansForTheService;
  serviceServiceFactory.getServicePlanForTheService = _getServicePlanForTheService;
  serviceServiceFactory.getServices = _getServices;
  serviceServiceFactory.getService = _getService;


  return serviceServiceFactory;
}]);