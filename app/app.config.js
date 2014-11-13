angular.module('app').config(['$routeProvider', function($routeProvider) {
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

angular.module('app').config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
}]);