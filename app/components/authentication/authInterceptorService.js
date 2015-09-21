angular.module('app.auth').factory('authInterceptorService', ['$q', '$location', '$injector', '$rootScope', '$log', function($q, $location, $injector, $rootScope, $log) {
  var authInterceptorServiceFactory = {};

  var _request = function(config) {

    config.headers = config.headers || {};

    var accessToken = sessionStorage.getItem('accessToken');
    var userName = sessionStorage.getItem('userName');

    if (config.headers.Authorization === undefined && accessToken !== null && userName !== null) {
      config.headers.Authorization = 'Bearer ' + accessToken;
      config.headers['X-Webui-Authorization'] = 'Bearer ' + accessToken;
    }

    var lastTime = sessionStorage.getItem('lastTime');

    var timeOut = Date.now() - lastTime;
    console.log('La hora ahora:');
    console.log(Date.now());
    console.log('La hora antes:');
    console.log(lastTime);
    console.log('La diferencia:');
    console.log(timeOut);

    if (timeOut < 600000){
      console.log('Actualizo timeout');
      sessionStorage.setItem('lastTime', Date.now());
    }

    return config;
  };

  var _responseError = function(rejection) {

    var timeOut = Date.now() - sessionStorage.getItem('lastTime');
    if ($rootScope.nrOfUnauthorizedRequests === 0 && rejection.status === 401) {
      var authService = $injector.get('authService');
      var $route = $injector.get('$route');
      var $location = $injector.get('$location');
      var messageService = $injector.get('messageService');
      if(timeOut > 600000){
        console.log(timeOut);
        console.log('Timeout');
        //$location.path('/login');
        authService.logOut();
        sessionStorage.setItem('lastTime', 0);
      }

      authService.refresh().then(function(response) {
        $route.reload(); 
      },
      function (err) {
        messageService.addMessage('danger', err.error_description);
        $log.error(err);
        $location.path('/login');
        authService.logOut();
        //$location.path('/login');
        //$route.reload();
      });
    }


    $rootScope.nrOfUnauthorizedRequests++;

    $log.error(rejection);
    return $q.reject(rejection);
  };

  authInterceptorServiceFactory.request = _request;
  authInterceptorServiceFactory.responseError = _responseError;

  return authInterceptorServiceFactory;
}]);