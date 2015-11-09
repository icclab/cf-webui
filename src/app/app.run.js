angular.module('app').run(['$rootScope', '$location', '$route', 'authService', function($rootScope, $location, $route, authService) {
  $rootScope.nrOfUnauthorizedRequests = 0;
  $rootScope.rootFields = {};

  authService.fillAuthData();

  var marginSidebar= sessionStorage.getItem('marginSidebar');
  if (marginSidebar){
    $rootScope.rootFields.marginSidebar = marginSidebar;
  }else{
    sessionStorage.setItem('marginSidebar', "220px");
    $rootScope.rootFields.marginSidebar = "220px";
  }

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
  });

  $rootScope.$on('cfpLoadingBar:loading', function (event) {
    $rootScope.rootFields.showContent = false;
  });
  
  $rootScope.$on('cfpLoadingBar:completed', function (event) {
    $rootScope.rootFields.showContent = true;

  });
  

}]);