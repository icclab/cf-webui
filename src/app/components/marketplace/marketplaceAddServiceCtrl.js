angular.module('app.marketplace').controller('marketplaceAddServiceCtrl', ['$q', '$rootScope', '$scope', '$routeParams', '$route', '$location', '$log', 'serviceService', 'serviceBindingService', 'organizationService', 'spaceService', 'serviceInstanceService', 'messageService', function($q, $rootScope, $scope, $routeParams, $route, $location, $log, serviceService, serviceBindingService, organizationService, spaceService, serviceInstanceService, messageService) {
  $rootScope.rootFields.showContent = false;

  $scope.organizationId = $routeParams.organizationId;
  $scope.spaceId = $routeParams.spaceId;
  $scope.applicationId = null;
  $scope.services = [];
  $scope.selectedService = null;
  $scope.organizations = [];
  $scope.spaces = [];
  $scope.applications = [];

  var getServicesPromise = null;

  if ($scope.organizationId){
    getServicesPromise = spaceService.getServicesForTheSpace($scope.spaceId);
  } else{
    getServicesPromise = serviceService.getServices();
  }

  getServicesPromise.then(function(response) {

    angular.forEach(response.data.resources, function(service, i) {
      var extraData = JSON.parse(service.entity.extra);

      var objectService = {
        id: service.metadata.guid,
	      //cope with cases where extraData is Null and avoid premature exit
        name: (extraData && extraData.displayName) ? extraData.displayName : service.entity.label,
        description: service.entity.description,
        longDescription: (extraData && extraData.longDescription) ? extraData.longDescription : service.entity.long_description,
        provider: (extraData && extraData.providerDisplayName) ? extraData.providerDisplayName : service.entity.provider,
        imageUrl: (extraData && extraData.imageUrl) ? extraData.imageUrl : null,
        documentationUrl: (extraData && extraData.documentationUrl) ? extraData.documentationUrl : service.entity.documentation_url,
        supportUrl: (extraData && extraData.supportUrl) ? extraData.supportUrl : null
      };

      $scope.services.push(objectService);
    });

  }, function(err) {
    messageService.addMessage('danger', 'The marketplace services have not been loaded.');
    $log.error(err);
  });

  $scope.selectService = function(selectedService) {
    $location.path($location.url()+'/' + selectedService.id);
  };

  $scope.addServiceInstance = function() {
    var defer = $q.defer();
    var serviceInstance = {
      name: $scope.instanceName,
      spaceId: $scope.spaceId,
      servicePlanId: $scope.selectedServicePlan.id
    };
  };

}]);