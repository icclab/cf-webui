app.factory('organizationService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var organizationServiceFactory = {};

  var _getOrganizations = function() {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/organizations'
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

  var _getOrganization = function(id) {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/organizations/' + id
    };

    // http headers
    headers = {
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

  var _getSpacesForTheOrganization = function(id) {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/organizations/' + id +  '/spaces'
    };

    // http headers
    headers = {
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

  organizationServiceFactory.getOrganizations = _getOrganizations;
  organizationServiceFactory.getOrganization = _getOrganization;
  organizationServiceFactory.getSpacesForTheOrganization = _getSpacesForTheOrganization;

  return organizationServiceFactory;
}]);