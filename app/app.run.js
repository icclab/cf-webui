angular.module('app').run(['$rootScope', '$location', '$route', 'authService', function($rootScope, $location, $route, authService) {
  authService.fillAuthData();

  // redirect the user to the login page if he is not logged in
  $rootScope.$on('$routeChangeStart', function(event) {
    var authentication = authService.authentication;
    
    if (!authentication.isAuth && $location.path() != '/login') {
      $location.path('/login');
      $route.reload();
    }
  });
}]);