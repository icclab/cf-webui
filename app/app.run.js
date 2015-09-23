angular.module('app').run(['$rootScope', '$location', '$route', 'authService', function($rootScope, $location, $route, authService) {
  $rootScope.nrOfUnauthorizedRequests = 0;
  $rootScope.rootFields = {};

  authService.fillAuthData();
  
  console.log('¿Borrar mensajes? (app run)');
  console.log($rootScope.rootFields.deleteMessages);

  // redirect the user to the login page if he is not logged in
  $rootScope.$on('$routeChangeStart', function(event) {
    $rootScope.nrOfUnauthorizedRequests = 0;
    var authentication = authService.authentication;
    
    if (!authentication.isAuth && $location.path() != '/login') {
      $location.path('/login');
      $route.reload();
    }
  });
  
  $rootScope.$on('cfpLoadingBar:started', function (event) {
    $rootScope.rootFields.showContent = false;
    console.log('¿Borrar mensajes? (started)');
    console.log($rootScope.rootFields.waitDelete);
  });

  $rootScope.$on('cfpLoadingBar:loading', function (event) {
    $rootScope.rootFields.showContent = false;
    //$rootScope.rootFields.deleteMessages=true;
    console.log('¿Borrar mensajes? (loading)');
    console.log($rootScope.rootFields.waitDelete);
  });
  
  $rootScope.$on('cfpLoadingBar:completed', function (event) {
    $rootScope.rootFields.showContent = true;
    //$rootScope.rootFields.deleteMessages=false;
    console.log('¿Borrar mensajes? (completed)');
    console.log($rootScope.rootFields.waitDelete);
  });
}]);