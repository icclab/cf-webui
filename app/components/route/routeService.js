angular.module('app.route').factory('routeService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var routeServiceFactory = {};
  
  var globalRouteConfig;
  
  var _getRoutesForApp = function(id) {
    
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/apps/' + id + '/routes',
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
  
  var _createRoute = function(config) {
    
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/routes',
      'domain_guid': config.domainID,
      'space_guid': config.spaceID,
      'host' : config.host
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
  
  var _mapRoute = function(config) {
    
    globalRouteConfig = config;
    
    // First: create route
    return this.createRoute(config).then(function(response) {
      globalRouteConfig.routeID = response.data.metadata.guid;
      
      // Second: map route
      // data
      var data = {
        'url': API_ENDPOINT + '/v2/routes/' + globalRouteConfig.routeID + '/apps/' + globalRouteConfig.applicationID,
        'guid': globalRouteConfig.routeID
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
      
    }, function(err) {
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
  
  routeServiceFactory.getRoutesForApp = _getRoutesForApp;
  routeServiceFactory.createRoute = _createRoute;
  routeServiceFactory.mapRoute = _mapRoute;
  routeServiceFactory.unmapRoute = _unmapRoute;
  
  return routeServiceFactory;
}]);