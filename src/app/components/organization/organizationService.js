angular.module('app.organization').factory('organizationService', ['$http', function($http) {
  var organizationServiceFactory = {};

  var _getOrganizations = function() {
    
    var accessToken = localStorage.getItem('accessToken');

    var url = '/v2/organizations';

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
      'X-Webui-Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json; charset=utf-8'
    };

    var config = {
      headers: headers
    };

    return $http.get('/v2/organizations', config);
  };

  var _getOrganization = function(id) {
    
    var url = '/v2/organizations/' + id;

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

  var _getSpacesForTheOrganization = function(id, ignoreLoadingBar) {
    if (typeof(ignoreLoadingBar) === 'undefined') ignoreLoadingBar = false;
    // params
    var url = '/v2/organizations/' + id +  '/spaces';

    // http headers
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      ignoreLoadingBar: ignoreLoadingBar
    };

    return $http.get(url, config);
  };
  
  var _getQuotaForTheOrganization = function(id) {
    // params
    var url = '/v2/quota_definitions';

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
  
  var _getSharedDomainsForTheOrganization = function() {
    
    var url = '/v2/shared_domains';

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
  
  var _getPrivateDomainsForTheOrganization = function(id) {
    
    var url = '/v2/organizations/' + id +  '/private_domains';

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
  
  var _getAllUsersForTheOrganization = function(id) {
    
    // params
    var url = '/v2/organizations/' + id +  '/users';

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

  var _retrieveRolesOfAllUsersForTheOrganization = function(id) {
    
    var url = '/v2/organizations/' + id +  '/user_roles';

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
  
  var _addOrganization = function(organization) {
    
    var url = '/v2/organizations';

    // data
    var data = {
      'name': organization.name
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
  
  var _editOrganization = function(organization) {
    
    var url = '/v2/organizations/' + organization.id;

    // data
    var data = {
      'name': organization.name
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    };

    var config = {
      headers: headers
    };

    return $http.put(url, data, config);
  };
  
  var _deleteOrganization = function(organization) {
    
    var url = '/v2/organizations/' + organization.id;

    // data
    var data = {
      'guid' : organization.id,
      'async' : true,
      'recursive' : true
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

  var _associateUserWithOrganization = function(user) {

    var url = '/v2/organizations/' + user.organizationId + '/users';
    
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

  var _disassociateUserWithOrganization = function(user) {
    
    var url = '/v2/organizations/' + user.organizationId + '/users/' + user.id;
    

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

  var _associateManagerWithOrganization = function(user) {

    var url = '/v2/organizations/' + user.organizationId + '/managers';
    
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

  var _disassociateManagerWithOrganization = function(user) {
    
    var url = '/v2/organizations/' + user.organizationId + '/managers/' + user.id;
      //'username': user.username,
      //'organization_guid': user.organizationId
    //};

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

  var _associateBillingManagerWithOrganization = function(user) {

    var url = '/v2/organizations/' + user.organizationId + '/billing_managers';
    
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

  var _disassociateBillingManagerWithOrganization = function(user) {
    
    var url = '/v2/organizations/' + user.organizationId + '/billing_managers/' + user.id;
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

    var _associateAuditorWithOrganization = function(user) {

    var url = '/v2/organizations/' + user.organizationId + '/auditors';
    
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

  var _disassociateAuditorWithOrganization = function(user) {

    var url = '/v2/organizations/' + user.organizationId + '/auditors/' + user.id;
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

  organizationServiceFactory.getOrganizations = _getOrganizations;
  organizationServiceFactory.getOrganization = _getOrganization;
  organizationServiceFactory.getQuotaForTheOrganization = _getQuotaForTheOrganization;
  organizationServiceFactory.getSpacesForTheOrganization = _getSpacesForTheOrganization;
  organizationServiceFactory.getSharedDomainsForTheOrganization = _getSharedDomainsForTheOrganization;
  organizationServiceFactory.getPrivateDomainsForTheOrganization = _getPrivateDomainsForTheOrganization;
  organizationServiceFactory.getAllUsersForTheOrganization = _getAllUsersForTheOrganization;
  organizationServiceFactory.retrieveRolesOfAllUsersForTheOrganization = _retrieveRolesOfAllUsersForTheOrganization;
  organizationServiceFactory.addOrganization = _addOrganization;
  organizationServiceFactory.editOrganization = _editOrganization;
  organizationServiceFactory.deleteOrganization = _deleteOrganization;
  organizationServiceFactory.associateUserWithOrganization = _associateUserWithOrganization;
  organizationServiceFactory.disassociateUserWithOrganization = _disassociateUserWithOrganization;
  organizationServiceFactory.associateManagerWithOrganization = _associateManagerWithOrganization;
  organizationServiceFactory.disassociateManagerWithOrganization = _disassociateManagerWithOrganization;
  organizationServiceFactory.associateBillingManagerWithOrganization = _associateBillingManagerWithOrganization;
  organizationServiceFactory.disassociateBillingManagerWithOrganization = _disassociateBillingManagerWithOrganization;
  organizationServiceFactory.associateAuditorWithOrganization = _associateAuditorWithOrganization;
  organizationServiceFactory.disassociateAuditorWithOrganization = _disassociateAuditorWithOrganization;

  return organizationServiceFactory;
}]);