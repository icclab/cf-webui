angular.module('app.service').factory('serviceService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var serviceServiceFactory = {};

  var _getServicePlansForTheService = function(serviceId) {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/services/' + serviceId + '/service_plans',
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

    return $http.get('/request.php', config).then(function(response) {
      return response;
    });
  };

  serviceServiceFactory.getServicePlansForTheService = _getServicePlansForTheService;

  return serviceServiceFactory;
}]);