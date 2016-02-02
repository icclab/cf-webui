angular.module('app.routes').factory('routeService', ['$http', function($http) {
  var routeServiceFactory = {};
  
  var globalRouteConfig;

  var _getRoutes = function(spaceId) {

    // params
    var url = '/v2/routes';
    var params = {
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

    return $http.get(url, config);
  };

  var _getRoutesForTheSpace = function(spaceId) {

    // params
    var url = '/v2/spaces/' + spaceId +'/routes';

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
  
  var _getRoutesForApp = function(id, ignoreLoadingBar) {
    if (typeof(ignoreLoadingBar) === 'undefined') ignoreLoadingBar = false;
    
    // params
    var url = '/v2/apps/' + id + '/routes';
    var params = {
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

    return $http.get(url, config);
  };

  var _getAppsForRoute = function(id, ignoreLoadingBar) {
    if (typeof(ignoreLoadingBar) === 'undefined') ignoreLoadingBar = false;
    
    var url = '/v2/routes/' + id + '/apps';

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      ignoreLoadingBar: ignoreLoadingBar
    };

    return $http.get(url, config);
  };
  
  var _createRoute = function(route) {
    
    var url = '/v2/routes';

    // data
    var data = {
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
    
    return $http.post(url, data, config);
  };

  var _deleteRoute = function(routeId) {
    
    var url = '/v2/routes/' + routeId + '?recursive=true';
    
    // data
    var data = {
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

    return $http.delete(url, config);
  };
  
  var _mapRoute = function(config) {
    
    globalRouteConfig = config;
    
    // First: create route
    return this.createRoute(config).then(function(response) {
      globalRouteConfig.routeId = response.data.metadata.guid;
      
      // Second: map route
      var url = '/v2/routes/' + globalRouteConfig.routeId + '/apps/' + globalRouteConfig.applicationId;

      // data
      var data = {
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
    
      return $http.put(url, data, config);
    });
    
  };
  
  var _unmapRoute = function(route) {
    
    var url = '/v2/apps/' + route.applicationId + '/routes/' + route.id;

    // data
    var data = {
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
    
    return $http.delete(url, config);
  };

  var _associateRouteWithApp = function(routeId, appId) {
    
    var url = '/v2/routes/' + routeId + '/apps/' + appId;

    // data
    var data = {
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
    
    return $http.put(url, data, config);
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