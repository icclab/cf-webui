angular.module('app.marketplace').controller('marketplaceAddServiceInstanceCtrl', ['$q', '$rootScope', '$scope', '$routeParams', '$route', '$location', '$log', 'serviceService', 'serviceBindingService', 'organizationService', 'spaceService', 'serviceInstanceService', 'messageService', function($q, $rootScope, $scope, $routeParams, $route, $location, $log, serviceService, serviceBindingService, organizationService, spaceService, serviceInstanceService, messageService) {
  $rootScope.rootFields.showContent = false;

  $scope.organizations = [];
  $scope.spaces = [];
  $scope.applications = [];

  $scope.serviceId = $routeParams.serviceId;
  $scope.servicePlanId = $routeParams.servicePlanId;
  $scope.organizationId = $routeParams.organizationId;
  $scope.spaceId = $routeParams.spaceId;
  $scope.applicationId = $routeParams.applicationId;

  serviceService.getService($scope.serviceId).then(function(response){
    $scope.service = response.data.entity;
  });

  serviceService.getServicePlanForTheService($scope.servicePlanId).then(function(response){
    
    $scope.servicePlan = response.data.entity;

    var extraData = JSON.parse(response.data.entity.extra);

    if (extraData.costs) {
      var unit = extraData.costs[0].unit.replace('LY', '');

      var currency = null;
      var amount = null;
      for (var i in extraData.costs[0].amount) {
        currency = i;
        amount = extraData.costs[0].amount[i];
        continue;
      }

      if (currency !== null && amount !== null) {
        $scope.servicePlan.costs = ($scope.servicePlan.free) ? 'free' : currency.toUpperCase() + ' ' + amount + '/' + unit;
      }
    }
    
  });

  $scope.getOrganizations = function() {
    organizationService.getOrganizations().then(function(response) {
      var data = response.data;
      //$scope.nrOfOrganizations = data.total_results;

      // create organization objects
      angular.forEach(data.resources, function(organization, i) {
        
        var objectOrganization = {
          id: organization.metadata.guid,
          name: organization.entity.name,
        };

        $scope.organizations.push(objectOrganization);
      });
    }, function (err) {
      messageService.addMessage('danger', 'The organizations have not been loaded.', true);
      $log.error(err);
    });
  };

  if ($scope.organizationId!==undefined){
    $scope.getOrganizations();
    getServicesPromise = spaceService.getServicesForTheSpace($scope.spaceId);
  } else{
    $scope.getOrganizations();
    $scope.showSelectOrganization = true;
  }

  $scope.selectSpace = function() {
    // clear spaces array on reload
    if ($scope.spaces.length > 0) {
      $scope.spaces.length = 0;
    }

    organizationService.getSpacesForTheOrganization($scope.organizationId, true).then(function(response) {
      //$log.error(config.ignoreLoadingBar);

      var data = response.data;

      // get summary for each space
      angular.forEach(data.resources, function(space, key) {
        spaceService.getSpaceSummary(space.metadata.guid, true).then(function(responseSpace) {
          var dataSpace = responseSpace.data;

          var objectSpace = {
            id: dataSpace.guid,
            name: dataSpace.name,
          };

          $scope.spaces.push(objectSpace);

          
        }, function(err) {
          $log.error(err);
        });
      });
      $scope.showSelectSpace = true;

    }, function(err) {
      messageService.addMessage('danger', 'The spaces have not been loaded.', true);
      $log.error(err);
    });

  };

  $scope.selectApplication = function() {
    // clear spaces array on reload
    if ($scope.applications.length > 0) {
      $scope.applications.length = 0;
    }

    spaceService.getSpaceSummary($scope.spaceId, true).then(function(response) {
      //$log.error(config.ignoreLoadingBar);
 

      var data = response.data;

      // get summary for each space
      angular.forEach(response.data.apps, function(app, i) {
        var objectApp = {
          id: app.guid,
          name: app.name,
        };

        $scope.applications.push(objectApp);
      });

      if ($scope.applications.length > 0){
        $scope.showSelectApplication = true;
      } else {
        $scope.showSelectApplication = false;
      }

    }, function(err) {
      messageService.addMessage('danger', 'The applications have not been loaded.', true);
      $log.error(err);
    });

  };

  $scope.addServiceBinding = function(serviceInstanceId) {

   var serviceBinding = {
      serviceInstanceId: serviceInstanceId,
      applicationId: $scope.applicationId
    };

    return serviceBindingService.addServiceBinding(serviceBinding);
  };


  $scope.addServiceInstance = function() {

    var defer = $q.defer();

    $location.path('/organizations/' + $scope.organizationId + '/spaces/' + $scope.spaceId);

    var serviceInstance = {
      name: $scope.instanceName,
      spaceId: $scope.spaceId,
      servicePlanId: $scope.servicePlanId
    };

    serviceInstanceService.addServiceInstance(serviceInstance).then(function(response) {
      
      if (response.data.error_code) {
        messageService.addMessage('danger', response.data.description);
      } else {
        //messageService.addMessage('success', 'The service instance has been successfully added.');
        if ($scope.applicationId){
          $scope.addServiceBinding(response.data.metadata.guid).then(function(response) {
            messageService.addMessage('success', 'The service has been successfully bound.', true);
          }, function(err) {
            messageService.addMessage('danger', 'The service has not been bound.', true);
            $log.error(err);
          });
        }  
        
        messageService.addMessage('success', 'The service instance has been successfully added.', true);

      }
      
    }, function(err) {
      messageService.addMessage('danger', 'The service instance has not been added: ' + err.data.description);
      $log.error(err);
    });       

  };



}]);