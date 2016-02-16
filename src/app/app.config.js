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

    .when('/organizations/:organizationId/spaces/:spaceId', {
      templateUrl: 'app/components/space/spaceDetails.tpl.html',
      controller: 'SpaceDetailsCtrl'
    })

    .when('/organizations/:organizationId/spaces/:spaceId/marketplace', {
      templateUrl: 'app/components/marketplace/marketplaceAddService.tpl.html',
      controller: 'marketplaceAddServiceCtrl'
    })

    .when('/organizations/:organizationId/spaces/:spaceId/marketplace/:serviceId', {
      templateUrl: 'app/components/marketplace/marketplaceSelectServicePlan.tpl.html',
      controller: 'marketplaceSelectServicePlanCtrl'
    })

    .when('/organizations/:organizationId/spaces/:spaceId/marketplace/:serviceId/plan/:servicePlanId', {
      templateUrl: 'app/components/marketplace/marketplaceAddServiceInstance.tpl.html',
      controller: 'marketplaceAddServiceInstanceCtrl'
    })
  
    .when('/organizations/:organizationId/spaces/:spaceId/applications/:applicationId', {
      templateUrl: 'app/components/application/applicationDetails.tpl.html',
      controller: 'ApplicationDetailsCtrl'
    })
    
    .when('/marketplace', {
      templateUrl: 'app/components/marketplace/marketplaceAddService.tpl.html',
      controller: 'marketplaceAddServiceCtrl'
    })

    .when('/marketplace/:serviceId', {
      templateUrl: 'app/components/marketplace/marketplaceSelectServicePlan.tpl.html',
      controller: 'marketplaceSelectServicePlanCtrl'
    })

    .when('/marketplace/:serviceId/plan/:servicePlanId', {
      templateUrl: 'app/components/marketplace/marketplaceAddServiceInstance.tpl.html',
      controller: 'marketplaceAddServiceInstanceCtrl'
    })

    .otherwise({
      redirectTo: '/organizations'
    });
}]);

angular.module('app').config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
}]);