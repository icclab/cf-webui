angular.module('app.info').factory('infoService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var infoServiceFactory = {};

  var _getInfo = function() {
    
    // data
    var params = {
      'url': API_ENDPOINT + '/v2/info'
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

  infoServiceFactory.getInfo = _getInfo;

  return infoServiceFactory;
}]);