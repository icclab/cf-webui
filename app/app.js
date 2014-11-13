var app = angular.module('app', [
  'ngRoute',
  'ngResource',

  'ui.bootstrap',

  'sidebarDirective',
  'topbarDirective',
  'breadcrumbDirective',

  'logIn',
  'organization',
  'space'
]);

app.constant('UAA_ENDPOINT', 'https://uaa.run.pivotal.io');
app.constant('API_ENDPOINT', 'https://api.run.pivotal.io');

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/components/logIn/logIn.tpl.html',
      controller: 'LogInCtrl'
    })

    .when('/organizations', {
      templateUrl: 'app/components/organization/organizationPreview.tpl.html',
      controller: 'OrganizationPreviewCtrl'
    })

    .when('/organizations/:organizationId', {
      templateUrl: 'app/components/organization/organizationDetails.tpl.html',
      controller: 'OrganizationDetailsCtrl'
    })

    .otherwise({
      redirectTo: '/organizations'
    });
}]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
}]);

app.run(['$rootScope', '$location', 'authService', function($rootScope, $location, authService) {
  authService.fillAuthData();

  // redirect the user to the login page if he is not logged in
  $rootScope.$on('$routeChangeStart', function(event) {
    var authentication = authService.authentication;
    if (!authentication.isAuth && $location.path() != '/login') {
      $location.path('/login');
    }
  });
}]);

app.controller('MainCtrl', ['$scope', function($scope) {

}]);