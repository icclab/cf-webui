app.factory('spaceService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
  var spaceServiceFactory = {};

  var _getSpaceSummary = function(id) {
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
      headers: headers
    };

    return $http.get('/request.php', config).then(function(response) {
      return response;
    });
  };

  spaceServiceFactory.getSpaceSummary = _getSpaceSummary;

  return spaceServiceFactory;
}]);