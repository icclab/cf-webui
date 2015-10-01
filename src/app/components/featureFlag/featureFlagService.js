angular.module('app.featureFlag').factory('featureFlagService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var featureFlagServiceFactory = {};

  var _getAllFeatureFlags = function(organization) {
    
    // data
    var params = {
      'url': API_ENDPOINT + '/v2/config/feature_flags'
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      params: params
    };

    return $http.get('/request.php', config);
  };

  var _getUserOrgCreationFeatureFlag = function(organization) {
    
    // data
    var params = {
      'url': API_ENDPOINT + '/v2/config/feature_flags/user_org_creation'
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      params: params
    };

    return $http.get('/request.php', config);
  };

  featureFlagServiceFactory.getAllFeatureFlags = _getAllFeatureFlags;
  featureFlagServiceFactory.getUserOrgCreationFeatureFlag = _getUserOrgCreationFeatureFlag;


  return featureFlagServiceFactory;
}]);