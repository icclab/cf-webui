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
    console.log('rejection: ' + rejection.status);

    if (rejection.status === 401) {
      $location.path('/login');
    }

    return $q.reject(rejection);
  };

  var _response = function(response){
    if (response.status === 401) {
      console.log("Response 401");
    }
    return response || $q.when(response);
  };

  authInterceptorServiceFactory.request = _request;
  authInterceptorServiceFactory.response = _response;
  authInterceptorServiceFactory.responseError = _responseError;

  return authInterceptorServiceFactory;
}]);