angular.module('app.space').controller('SpaceAddServiceCtrl', ['$scope', '$routeParams', '$location', 'spaceService', 'serviceService', 'serviceInstanceService', 'messageService', function($scope, $routeParams, $location, spaceService, serviceService, serviceInstanceService, messageService) {

  $scope.organizationId = $routeParams.organizationId;
  $scope.spaceId = $routeParams.spaceId;
  $scope.services = [];
  $scope.selectedService = null;
  $scope.spaceName = null;

  $scope.hideSelectService = false;
  $scope.hideSelectServicePlan = true;
  $scope.hideAddServiceInstance = true;

  var getSpaceSummaryPromise = spaceService.getSpaceSummary($scope.spaceId);
  getSpaceSummaryPromise.then(function(response) {
    $scope.spaceName = response.data.name;
  });

  var getServicesForTheSpacePromise = spaceService.getServicesForTheSpace($scope.spaceId);
  getServicesForTheSpacePromise.then(function(response) {

    angular.forEach(response.data.resources, function(service, i) {
      var extraData = JSON.parse(service.entity.extra);

      var objectService = {
        id: service.metadata.guid,
        name: (extraData.displayName) ? extraData.displayName : service.entity.label,
        description: service.entity.description,
        longDescription: (extraData.longDescription) ? extraData.longDescription : service.entity.long_description,
        provider: (extraData.providerDisplayName) ? extraData.providerDisplayName : service.entity.provider,
        imageUrl: (extraData.imageUrl) ? extraData.imageUrl : null,
        documentationUrl: (extraData.documentationUrl) ? extraData.documentationUrl : service.entity.documentation_url,
        supportUrl: (extraData.supportUrl) ? extraData.supportUrl : null
      };

      $scope.services.push(objectService);
    });

  }, function(err) {
    messageService.addMessage('danger', 'The space services have not been loaded: ' + err);
  });

  $scope.selectService = function(selectedService) {
    $scope.selectedService = selectedService;
    $scope.servicePlans = [];

    var getServicePlansForTheServicePromise = serviceService.getServicePlansForTheService(selectedService.id);
    getServicePlansForTheServicePromise.then(function(response) {

      angular.forEach(response.data.resources, function(servicePlan, i) {
        var extraData = JSON.parse(servicePlan.entity.extra);

        // get costs
        var costs = null;
        if (extraData.costs) {
          var unit = extraData.costs[0].unit.replace('LY', '');

          var currency = null;
          var amount = null;
          for (i in extraData.costs[0].amount) {
            currency = i;
            amount = extraData.costs[0].amount[i];
            continue;
          }

          if (currency !== null && amount !== null) {
            costs = currency.toUpperCase() + ' ' + amount + '/' + unit;
          }
        }

        var objectServicePlan = {
          id: servicePlan.metadata.guid,
          name: (extraData.displayName) ? extraData.displayName : servicePlan.entity.name,
          description: servicePlan.entity.description,
          bullets: (extraData.bullets) ? extraData.bullets : null,
          costs: (servicePlan.entity.free) ? 'free' : costs
        };

        $scope.servicePlans.push(objectServicePlan);
      });

      $scope.hideSelectService = true;
      $scope.hideSelectServicePlan = false;
      $scope.hideAddServiceInstance = true;

    }, function(err) {
      messageService.addMessage('danger', 'The service plans have not been loaded: ' + err);
    });
  };

  $scope.selectServicePlan = function(selectedServicePlan) {
    $scope.selectedServicePlan = selectedServicePlan;

    $scope.hideSelectService = true;
    $scope.hideSelectServicePlan = true;
    $scope.hideAddServiceInstance = false;
  };

  $scope.addServiceInstance = function() {
    var serviceInstance = {
      name: $scope.instanceName,
      spaceId: $scope.spaceId,
      servicePlanId: $scope.selectedServicePlan.id
    };

    serviceInstanceService.addServiceInstance(serviceInstance).then(function(response) {
      if (response.data.error_code) {
        messageService.addMessage('danger', response.data.description);
      } else {
        messageService.addMessage('success', 'The service instance has been successfully added.');
      }
      
      $location.path('/organizations/' + $scope.organizationId + '/spaces/' + $scope.spaceId);
    }, function(err) {
      messageService.addMessage('danger', 'The service instance has not been added: ' + err.data.description);
      $location.path('/organizations/' + $scope.organizationId + '/spaces/' + $scope.spaceId);
    });
  };

}]);