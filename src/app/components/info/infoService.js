angular.module('app.info').factory('infoService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var infoServiceFactory = {};

  var _getInfo = function() {
    
    // data
    var url = '/v2/info';

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

  infoServiceFactory.getInfo = _getInfo;

  return infoServiceFactory;
}]);