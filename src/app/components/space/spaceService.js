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

    return $http.get('/request.php', config);
  };

  var _getSpaceSummary = function(id, ignoreLoadingBar) {
    if (typeof(ignoreLoadingBar) === 'undefined') ignoreLoadingBar = false;
    
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
      headers: headers,
      ignoreLoadingBar: ignoreLoadingBar
    };

    return $http.get('/request.php', config);
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

    return $http.get('/request.php', config);
  };

  var _retrieveRolesOfAllUsersForTheSpace = function(id) {
    
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/spaces/' + id +  '/user_roles',
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

    return $http.get('/request.php', config);
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

    return $http.put('/request.php', data, config);
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

    return $http.post('/request.php', data, config);
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
    
    return $http.delete('/request.php', config);
  };

  var _associateManagerWithSpace = function(user) {

    // data
    var data = {
      'url': API_ENDPOINT + '/v2/spaces/' + user.spaceId + '/managers',
      'username': user.name,
      //'organization_guid': user.organizationId
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    console.log(data.url);
    console.log(data.username);

    return $http.put('/request.php', data, config);
  };

  var _disassociateManagerWithSpace = function(user) {
    console.log(user);
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/spaces/' + user.spaceId + '/managers/' + user.userId,
      //'username': user.username,
      //'organization_guid': user.organizationId
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

    console.log(data.url);
    console.log(data.username);

    return $http.delete('/request.php', config);
  };

  var _associateDeveloperWithSpace = function(user) {
    console.log(user);
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/spaces/' + user.spaceId + '/developers',
      'username': user.name,
      //'organization_guid': user.organizationId
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    console.log(data.url);
    console.log(data.username);

    return $http.put('/request.php', data, config);
  };

  var _disassociateDeveloperWithSpace = function(user) {
    console.log(user);
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/spaces/' + user.spaceId + '/developers/' + user.userId,
      //'username': user.username,
      //'organization_guid': user.organizationId
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

    console.log(data.url);
    console.log(data.username);

    return $http.delete('/request.php', config);
  };

    var _associateAuditorWithSpace = function(user) {
    console.log(user);
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/spaces/' + user.spaceId + '/auditors',
      'username': user.name,
      //'organization_guid': user.organizationId
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    console.log(data.url);
    console.log(data.username);

    return $http.put('/request.php', data, config);
  };

  var _disassociateAuditorWithSpace = function(user) {
    console.log(user);
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/spaces/' + user.spaceId + '/auditors/' + user.userId,
      //'username': user.username,
      //'organization_guid': user.organizationId
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

    console.log(data.url);

    return $http.delete('/request.php', config);
  };

  spaceServiceFactory.getSpaces = _getSpaces;
  spaceServiceFactory.getSpaceSummary = _getSpaceSummary;
  spaceServiceFactory.getServicesForTheSpace = _getServicesForTheSpace;
  spaceServiceFactory.editSpace = _editSpace;
  spaceServiceFactory.addSpace = _addSpace;
  spaceServiceFactory.deleteSpace = _deleteSpace;
  spaceServiceFactory.retrieveRolesOfAllUsersForTheSpace = _retrieveRolesOfAllUsersForTheSpace;
  spaceServiceFactory.associateManagerWithSpace = _associateManagerWithSpace;
  spaceServiceFactory.disassociateManagerWithSpace = _disassociateManagerWithSpace;
  spaceServiceFactory.associateDeveloperWithSpace = _associateDeveloperWithSpace;
  spaceServiceFactory.disassociateDeveloperWithSpace = _disassociateDeveloperWithSpace;
  spaceServiceFactory.associateAuditorWithSpace = _associateAuditorWithSpace;
  spaceServiceFactory.disassociateAuditorWithSpace = _disassociateAuditorWithSpace;

  return spaceServiceFactory;
}]);