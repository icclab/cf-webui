angular.module('app.auth').factory('authInterceptorService', ['$q', '$location', '$injector', function($q, $location, $injector) {
  var authInterceptorServiceFactory = {};
  var i = 0;

  var _request = function(config) {
    config.headers = config.headers || {};

    var accessToken = sessionStorage.getItem('accessToken');
    var userName = sessionStorage.getItem('userName');
    if (config.headers.Authorization === undefined && accessToken !== null && userName !== null) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }

    return config;
  };

  var _responseError = function(rejection) {
    if (i === 0 && rejection.status === 401) {
      var authService = $injector.get('authService');
      var $route = $injector.get('$route');
      authService.refresh().then(function(response) {
        $route.reload();
      },
      function (err) {
        messageService.addMessage('danger', err.error_description);
      });
    }

    i++;
    return $q.reject(rejection);
  };

  authInterceptorServiceFactory.request = _request;
  authInterceptorServiceFactory.responseError = _responseError;

  return authInterceptorServiceFactory;
}]);