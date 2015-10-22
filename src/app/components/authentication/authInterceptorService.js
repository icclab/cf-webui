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

    if (timeOut < 600000){
      sessionStorage.setItem('lastTime', Date.now());
      console.log('Tiempo');
    }

    return config;
  };

  var _responseError = function(rejection) {

    var timeOut = Date.now() - sessionStorage.getItem('lastTime');
    if ($rootScope.nrOfUnauthorizedRequests === 0 && rejection.status === 401 && (sessionStorage.getItem('accessToken')!== null)) {
      var authService = $injector.get('authService');
      var $route = $injector.get('$route');
      var $location = $injector.get('$location');
      var messageService = $injector.get('messageService');
      $log.error(timeOut);
      if(timeOut > 600000){
        authService.logOut();
        sessionStorage.setItem('lastTime', 0);
      }

      authService.refresh().then(function(response) {
        $route.reload(); 
      },
      function (err) {  
        authService.logOut();
        $location.path('/login');
        messageService.removeAllMessages();
        if (err.error==='invalid_token'){
          messageService.addMessage('danger', 'Your session has expired. Please, log in again.', true);
        }else{
          messageService.addMessage('danger', err.error_description, true);
        }
        $log.error(err);
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