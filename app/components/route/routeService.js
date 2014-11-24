angular.module('app.route').factory('routeService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var routeServiceFactory = {};
  
  var _mapRoute = function(application) {
    
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/routes/' + application.id + '/apps/' + application.routeID,
      'guid': orapplication.routeID
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
  
  var _unmapRoute = function(route) {
    
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/apps/' + route.applicationID + '/routes/' + route.guid,
      'guid' : route.applicationID
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
      return route;
    }).error(function(err, status) {
      // TODO: error handling
    });
  };
  
  routeServiceFactory.mapRoute = _mapRoute;
  routeServiceFactory.unmapRoute = _unmapRoute;
  
  return routeServiceFactory;
}]);