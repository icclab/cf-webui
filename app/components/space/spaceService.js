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

    return $http.put('/request.php', data, config).success(function(response) {
      console.log(space);
      console.log('space changed');
    }).error(function(err, status) {
      console.log('error: ' + err);
    });
  };

  spaceServiceFactory.getSpaceSummary = _getSpaceSummary;
  spaceServiceFactory.editSpace = _editSpace;

  return spaceServiceFactory;
}]);