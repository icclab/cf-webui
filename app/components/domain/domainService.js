angular.module('app.domain').factory('domainService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var domainServiceFactory = {};
  
  var _addDomain = function(domain) {
    
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/private_domains',
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

    return $http.post('/request.php', data, config).success(function(response) {
      // TODO: error handling
    }).error(function(err, status) {
      // TODO: error handling
    });
  };
  
  var _deleteDomain = function(domain) {
    
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/private_domains/' + domain.metadata.guid,
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
    
    return $http.delete('/request.php', config).success(function(response) {
      // TODO: error handling
    }).error(function(err, status) {
      // TODO: error handling
    });
  };
  
  domainServiceFactory.addDomain = _addDomain;
  domainServiceFactory.deleteDomain = _deleteDomain;
  
  return domainServiceFactory;
}]);