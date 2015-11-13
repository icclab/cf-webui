angular.module('app.routes').factory('routeService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var routeServiceFactory = {};
  
  var globalRouteConfig;

  var _getRoutes = function(spaceId) {

    // params
    var params = {
      'url': API_ENDPOINT + '/v2/routes',
      'space_guid': spaceId
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      params: params,
    };

    return $http.get('/request.php', config);
  };

  var _getRoutesForTheSpace = function(spaceId) {

    // params
    var params = {
      'url': API_ENDPOINT + '/v2/spaces/' + spaceId +'/routes',
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      params: params,
    };

    return $http.get('/request.php', config);
  };
  
  var _getRoutesForApp = function(id, ignoreLoadingBar) {
    if (typeof(ignoreLoadingBar) === 'undefined') ignoreLoadingBar = false;
    
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
      params: params,
      ignoreLoadingBar: ignoreLoadingBar
    };

    return $http.get('/request.php', config);
  };

  var _getAppsForRoute = function(id, ignoreLoadingBar) {
    if (typeof(ignoreLoadingBar) === 'undefined') ignoreLoadingBar = false;
    
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/routes/' + id + '/apps',
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      params: params,
      ignoreLoadingBar: ignoreLoadingBar
    };

    return $http.get('/request.php', config);
  };
  
  var _createRoute = function(route) {
    
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/routes',
      'domain_guid': route.domainId,
      'space_guid': route.spaceId,
      'host' : route.host
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    config = {
      headers: headers
    };
    
    return $http.post('/request.php', data, config);
  };

  var _deleteRoute = function(routeId) {
    
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/routes/' + routeId + '?recursive=true',
      'guid': routeId
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
  
  var _mapRoute = function(config) {
    
    globalRouteConfig = config;
    
    // First: create route
    return this.createRoute(config).then(function(response) {
      globalRouteConfig.routeId = response.data.metadata.guid;
      
      // Second: map route
      // data
      var data = {
        'url': API_ENDPOINT + '/v2/routes/' + globalRouteConfig.routeId + '/apps/' + globalRouteConfig.applicationId,
        'guid': globalRouteConfig.routeId
      };

      // http headers
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      var config = {
        headers: headers
      };
    
      return $http.put('/request.php', data, config);
    });
    
  };
  
  var _unmapRoute = function(route) {
    
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/apps/' + route.applicationId + '/routes/' + route.id,
      'guid' : route.applicationId
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

  var _associateRouteWithApp = function(routeId, appId) {
    
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/routes/' + routeId + '/apps/' + appId,
      'guid': routeId
    };
    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };
    
    return $http.put('/request.php', data, config);
  };

  
  routeServiceFactory.getRoutes = _getRoutes;
  routeServiceFactory.getRoutesForTheSpace = _getRoutesForTheSpace;
  routeServiceFactory.getRoutesForApp = _getRoutesForApp;
  routeServiceFactory.getAppsForRoute = _getAppsForRoute;
  routeServiceFactory.createRoute = _createRoute;
  routeServiceFactory.deleteRoute = _deleteRoute;
  routeServiceFactory.mapRoute = _mapRoute;
  routeServiceFactory.associateRouteWithApp = _associateRouteWithApp;
  routeServiceFactory.unmapRoute = _unmapRoute;
  
  return routeServiceFactory;
}]);