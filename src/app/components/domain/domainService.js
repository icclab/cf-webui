angular.module('app.domain').factory('domainService', ['$http', function($http) {
  var domainServiceFactory = {};
  
  var _getSharedDomainsForTheOrganization = function(ignoreLoadingBar) {
    if (typeof(ignoreLoadingBar) === 'undefined') ignoreLoadingBar = false;
    
    // params
    var url = '/v2/shared_domains';

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
  
  var _getPrivateDomainsForTheOrganization = function(id, ignoreLoadingBar) {
    if (typeof(ignoreLoadingBar) === 'undefined') ignoreLoadingBar = false;
    
    // params
    var url = '/v2/organizations/' + id +  '/private_domains';

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
  
  var _addDomain = function(domain) {
    
    var url = '/v2/private_domains';

    // data
    var data = {
      'name': domain.name,
      'owning_organization_guid': domain.organizationID
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
  
  var _deleteDomain = function(domain) {
    
    var url = '/v2/private_domains/' + domain.metadata.guid;

    // data
    var data = {
      'guid' : domain.metadata.guid,
      'name' : domain.entity.name
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
  
  domainServiceFactory.getPrivateDomainsForTheOrganization =_getPrivateDomainsForTheOrganization;
  domainServiceFactory.getSharedDomainsForTheOrganization =_getSharedDomainsForTheOrganization;
  domainServiceFactory.addDomain = _addDomain;
  domainServiceFactory.deleteDomain = _deleteDomain;
  
  return domainServiceFactory;
}]);