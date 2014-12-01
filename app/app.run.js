angular.module('app').run(['$rootScope', '$location', 'authService', function($rootScope, $location, authService) {
  authService.fillAuthData();

  // redirect the user to the login page if he is not logged in
  $rootScope.$on('$routeChangeStart', function(event) {
    var authentication = authService.authentication;
    
    if (!authentication.isAuth && $location.path() != '/login') {
      $location.path('/login');
    }
  });
}]);