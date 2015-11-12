angular.module('app.auth').factory('authService', ['$http', '$log', '$q', '$injector', '$rootScope', 'UAA_ENDPOINT', function($http, $log, $q, $injector, $rootScope, UAA_ENDPOINT) {
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
    //'response_type': 'token'
 
    //'client_id': 'cf'
    //'redirect_uri': 'https://cf-webui.cfapps.io/#organizations'

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic Y2Y6',
      'X-Webui-Authorization': 'Basic Y2Y6',
    };

    var deferred = $q.defer();

    $http.post('/request.php', data, { headers: headers }).success(function(response) {
      if (response.access_token !== null) {
        // save access token and username in session storage
        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('refreshToken', response.refresh_token);
        localStorage.setItem('expiresIn', response.expires_in);
        localStorage.setItem('userName', logInData.userName);
        localStorage.setItem('lastTime', Date.now());

        // set data of authentication object
        _authentication.isAuth = true;
        _authentication.userName = logInData.userName;

        deferred.resolve(response);
      } else {
        // log in failed
        deferred.reject(response);
      }
    }).error(function(err, status) {
      $log.error(err);
      //_logOut();
      deferred.reject(err);
    });

    return deferred.promise;
  };

  var _refresh = function() {
    var refreshToken = localStorage.getItem('refreshToken');
    var accessToken = localStorage.getItem('accessToken');

    // data to post
    var data = {
      'url': UAA_ENDPOINT + '/oauth/token',
      //'client_id': 'cf',
      'grant_type': 'refresh_token',
      'refresh_token': refreshToken,
      'scope': ''
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic Y2Y6',
      'X-Webui-Authorization': 'Basic Y2Y6',
      //'WWW-Authorization': 'Basic Y2Y6',

    };

    var deferred = $q.defer();

    $http.post('/request.php', data, { headers: headers }).success(function(response) {
      if (response.access_token !== null) {
        // save access token and username in session storage
        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('refreshToken', response.refresh_token);

        // set data of authentication object
        _authentication.isAuth = true;

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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');

    // reset authentication object
    _authentication.isAuth = false;
    _authentication.userName = '';
  };

  var _fillAuthData = function() {
    var accessToken = localStorage.getItem('accessToken');
    var refreshToken = localStorage.getItem('refreshToken');
    var userName = localStorage.getItem('userName');

    if (accessToken !== null && userName !== null) {
      _authentication.isAuth = true;
      _authentication.userName = userName;
    }
  };

  authServiceFactory.logIn = _logIn;
  authServiceFactory.refresh = _refresh;
  authServiceFactory.logOut = _logOut;
  authServiceFactory.fillAuthData = _fillAuthData;
  authServiceFactory.authentication = _authentication;

  return authServiceFactory;
}]);