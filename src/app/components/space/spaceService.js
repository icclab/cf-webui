angular.module('app.space').factory('spaceService', ['$http', function($http) {
  var spaceServiceFactory = {};

  var _getSpaces = function() {
    // params
    var url = '/v2/spaces';

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

  var _getSpaceSummary = function(id, ignoreLoadingBar) {
    if (typeof(ignoreLoadingBar) === 'undefined') ignoreLoadingBar = false;
    
    // params
    var url = '/v2/spaces/' + id + '/summary';

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

  var _getServicesForTheSpace = function(id) {
    // params
    var url = '/v2/spaces/' + id + '/services';
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

    var _getServicesInstancesForTheSpace = function(id) {
    // params
    var url = '/v2/spaces/' + id + '/service_instances';

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

  var _getApplicationsForTheSpace = function(id) {
    // params
    var url = '/v2/spaces/' + id + '/apps';

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

  var _retrieveRolesOfAllUsersForTheSpace = function(id) {
    
    // params
    var url = '/v2/spaces/' + id +  '/user_roles';

    // http headers
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.get(url, config);
  };
  

  var _editSpace = function(space) {
    
    var url = '/v2/spaces/' + space.id;

    // data
    var data = {
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

    return $http.put(url, data, config);
  };

  var _addSpace = function(space) {
    
    var url = '/v2/spaces';

    // data
    var data = {
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

    return $http.post(url, data, config);
  };
  
  var _deleteSpace = function(space) {
    
    var url = '/v2/spaces/' + space.id + '?recursive=true';

    // data
    var data = {
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
    
    return $http.delete(url, config);
  };

  var _associateManagerWithSpace = function(user) {

    var url = '/v2/spaces/' + user.spaceId + '/managers';

    // data
    var data = {
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

    return $http.put(url, data, config);
  };

  var _disassociateManagerWithSpace = function(user) {
    
    var url = '/v2/spaces/' + user.spaceId + '/managers/' + user.id;
      //'username': user.username,
      //'organization_guid': user.organizationId

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
    };

    return $http.delete(url, config);
  };

  var _associateDeveloperWithSpace = function(user) {
    
    var url = '/v2/spaces/' + user.spaceId + '/developers';

    // data
    var data = {
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

    return $http.put(url, data, config);
  };

  var _disassociateDeveloperWithSpace = function(user) {
    
    var url = '/v2/spaces/' + user.spaceId + '/developers/' + user.id;
      //'username': user.username,
      //'organization_guid': user.organizationId

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
    };

    return $http.delete(url, config);
  };

    var _associateAuditorWithSpace = function(user) {
    
    var url = '/v2/spaces/' + user.spaceId + '/auditors';
    
    // data
    var data = {
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

    return $http.put(url, data, config);
  };

  var _disassociateAuditorWithSpace = function(user) {
    
    var url = '/v2/spaces/' + user.spaceId + '/auditors/' + user.id;
      //'username': user.username,
      //'organization_guid': user.organizationId

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
    };

    return $http.delete(url, config);
  };

  spaceServiceFactory.getSpaces = _getSpaces;
  spaceServiceFactory.getSpaceSummary = _getSpaceSummary;
  spaceServiceFactory.getServicesForTheSpace = _getServicesForTheSpace;
  spaceServiceFactory.getServicesInstancesForTheSpace = _getServicesInstancesForTheSpace;
  spaceServiceFactory.getApplicationsForTheSpace = _getApplicationsForTheSpace;
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