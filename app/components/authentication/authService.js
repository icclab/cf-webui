angular.module('app.auth').factory('authService', ['$http', '$q', 'UAA_ENDPOINT', function($http, $q, UAA_ENDPOINT) {
  var authServiceFactory = {};

  var _authentication = {
    isAuth: false,
    userName: ''
  };

  var _logIn = function(logInData) {
    // data to post
    var data = {
      'url': UAA_ENDPOINT + '/oauth/token',
      'grant_type': 'password',
      'password': logInData.password,
      'username': logInData.userName,
      'scope': ''
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic Y2Y6'
    };

    var deferred = $q.defer();

    $http.post('/request.php', data, { headers: headers }).success(function(response) {
      if (response.access_token !== null) {
        // save access token and username in session storage
        sessionStorage.setItem('accessToken', response.access_token);
        sessionStorage.setItem('refreshToken', response.refresh_token);
        sessionStorage.setItem('userName', logInData.userName);

        // set data of authentication object
        _authentication.isAuth = true;
        _authentication.userName = logInData.userName;

        deferred.resolve(response);
      } else {
        // log in failed
        deferred.reject(response);
      }
    }).error(function(err, status) {
      _logOut();
      deferred.reject(err);
    });

    return deferred.promise;
  };

  var _logOut = function() {
    // remove access token and username in session storage
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('userName');

    // reset authentication object
    _authentication.isAuth = false;
    _authentication.userName = '';
  };

  var _fillAuthData = function() {
    var accessToken = sessionStorage.getItem('accessToken');
    var refreshToken = sessionStorage.getItem('refreshToken');
    var userName = sessionStorage.getItem('userName');

    if (accessToken !== null && userName !== null) {
      _authentication.isAuth = true;
      _authentication.userName = userName;
    }
  };

  authServiceFactory.logIn = _logIn;
  authServiceFactory.logOut = _logOut;
  //authServiceFactory.refresh = _refresh;
  authServiceFactory.fillAuthData = _fillAuthData;
  authServiceFactory.authentication = _authentication;

  return authServiceFactory;
}]);