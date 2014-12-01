angular.module('app.auth').factory('authInterceptorService', ['$q', '$location', function($q, $location) {
  var authInterceptorServiceFactory = {};

  var _request = function(config) {
    config.headers = config.headers || {};

    var accessToken = sessionStorage.getItem('accessToken');
    var userName = sessionStorage.getItem('userName');
    if (accessToken !== null && userName !== null) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }

    return config;
  };

  var _responseError = function(rejection) {
    if (rejection.status === 401) {
      $location.path('/login');
    }

    return $q.reject(rejection);
  };

  authInterceptorServiceFactory.request = _request;
  authInterceptorServiceFactory.responseError = _responseError;

  return authInterceptorServiceFactory;
}]);