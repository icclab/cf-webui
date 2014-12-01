angular.module('app.space').factory('spaceService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var spaceServiceFactory = {};

  var _getSpaces = function() {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/spaces'
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

  var _getSpaceSummary = function(id) {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/spaces/' + id + '/summary'
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

  var _getServicesForTheSpace = function(id) {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/spaces/' + id + '/services',
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

  var _editSpace = function(space) {
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/spaces/' + space.id,
      'name': space.name
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

  var _addSpace = function(space) {
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/spaces',
      'name': space.name,
      'organization_guid': space.organizationId
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
  
  var _deleteSpace = function(space) {
    
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/spaces/' + space.id,
      'guid' : space.id
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
    }).error(function(err, status) {
      // TODO: error handling
    });
  };

  spaceServiceFactory.getSpaces = _getSpaces;
  spaceServiceFactory.getSpaceSummary = _getSpaceSummary;
  spaceServiceFactory.getServicesForTheSpace = _getServicesForTheSpace;
  spaceServiceFactory.editSpace = _editSpace;
  spaceServiceFactory.addSpace = _addSpace;
  spaceServiceFactory.deleteSpace = _deleteSpace;

  return spaceServiceFactory;
}]);