angular.module('app.marketplace').controller('marketplaceSelectServicePlanCtrl', ['$q', '$rootScope', '$scope', '$routeParams', '$route', '$location', '$log', 'serviceService', 'serviceBindingService', 'organizationService', 'spaceService', 'serviceInstanceService', 'messageService', function($q, $rootScope, $scope, $routeParams, $route, $location, $log, serviceService, serviceBindingService, organizationService, spaceService, serviceInstanceService, messageService) {
  $rootScope.rootFields.showContent = false;

  $scope.serviceId = $routeParams.serviceId;

  $scope.servicePlans = [];


  var getServicePlansForTheServicePromise = serviceService.getServicePlansForTheService($scope.serviceId);
  
  serviceService.getService($scope.serviceId).then(function(response){
    var service = response.data;
    //angular.forEach(response.data.resources, function(service, i) {
      var extraData = JSON.parse(response.data.entity.extra);

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

      $scope.selectedService=objectService;
    //});

  }, function(err) {
    messageService.addMessage('danger', 'The marketplace services have not been loaded.');
    $log.error(err);
  });

  getServicePlansForTheServicePromise.then(function(response) {

    angular.forEach(response.data.resources, function(servicePlan, i) {
      var extraData = JSON.parse(servicePlan.entity.extra);

      // get costs
      var costs = null;
      if (extraData && extraData.costs) {
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
        name: (extraData && extraData.displayName) ? extraData.displayName : servicePlan.entity.name,
        description: servicePlan.entity.description,
        bullets: (extraData && extraData.bullets) ? extraData.bullets : null,
        costs: (servicePlan.entity.free) ? 'free' : costs
      };

      $scope.servicePlans.push(objectServicePlan);
    });
  }, function(err) {
    messageService.addMessage('danger', 'The service plans have not been loaded.');
    $log.error(err);
  });

  $scope.selectServicePlan = function(servicePlanId) {
    $location.path($location.url() + '/plan/' + servicePlanId);
  };

}]);