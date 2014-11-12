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
  
  var _getQuotaForTheOrganization = function(id) {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/quota_definitions/' + id
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
  
  var _getSharedDomainsForTheOrganization = function() {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/shared_domains'
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
  
  var _getPrivateDomainsForTheOrganization = function(id) {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/organizations/' + id +  '/private_domains'
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
  
  var _getMembersForTheOrganization = function(id) {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/organizations/' + id +  '/users'
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
  organizationServiceFactory.getQuotaForTheOrganization = _getQuotaForTheOrganization;
  organizationServiceFactory.getSpacesForTheOrganization = _getSpacesForTheOrganization;
  organizationServiceFactory.getSharedDomainsForTheOrganization = _getSharedDomainsForTheOrganization;
  organizationServiceFactory.getPrivateDomainsForTheOrganization = _getPrivateDomainsForTheOrganization;
  organizationServiceFactory.getMembersForTheOrganization = _getMembersForTheOrganization;
  
  /*
  organizationServiceFactory.getAuditorsForTheOrganization = _getAuditorsForTheOrganization;
  organizationServiceFactory.getBillingManagersForTheOrganization = _getBillingManagersForTheOrganization;
  organizationServiceFactory.getManagersForTheOrganization = _getManagersForTheOrganization;
  */

  return organizationServiceFactory;
}]);