angular.module('app.application').controller('AppAddCtrl', ['$route', '$scope', '$modalInstance', '$log', 'application', 'applicationService', 'organizationService', 'routeService', 'messageService', function($route, $scope, $modalInstance, $log, application, applicationService, organizationService, routeService, messageService) {

  $scope.application = application;
  $scope.route = [];

  // domain info
  $scope.domains = [];
  $scope.nrOfDomains = 0;
  $scope.domainId = null;

  // get organization sharedDomains
  organizationService.getSharedDomainsForTheOrganization($scope.application.orgId).then(function(response) {
    var data = response.data;
    $scope.nrOfDomains += 1;
    //$scope.sharedDomains = (data.resources);
    angular.forEach(data.resources, function(sharedDomain, i){
      var sharedDomainObject = {
        id: sharedDomain.metadata.guid,
        name: sharedDomain.entity.name
      };
      $scope.domains.push(sharedDomainObject);
    });
  }, function(err) {
    $log.error(err.data.description);
  });
  
  // get organization privateDomains
  organizationService.getPrivateDomainsForTheOrganization($scope.application.orgId).then(function(response) {
    var data = response.data;
    $scope.nrOfDomains += data.total_results;
    //$scope.privateDomains = data.resources;
    angular.forEach(data.resources, function(privateDomain, i){
      var privateDomainObject = {
        id: privateDomain.metadata.guid,
        name: privateDomain.entity.name
      };
      $scope.domains.push(privateDomainObject);
    });
  }, function(err) {
    $log.error(err.data.description);
  });

  $scope.ok = function () {
    $scope.application.bits = $scope.files;

    $scope.route.domainId = $scope.domainId;
    $scope.route.spaceId = $scope.application.spaceId;

    applicationService.createApplication($scope.application).then(function(response) {

      routeService.createRoute($scope.route).then(function(routeResponse) {
        messageService.addMessage('success', 'The route has been successfully added.', true);
        $scope.route.id=routeResponse.data.metadata.guid;
        routeService.associateRouteWithApp($scope.route.id, $scope.application.id).then(function(mapRouteResponse) {
          messageService.addMessage('success', 'The route has been successfully mapped.', true);
          //$modalInstance.close($scope.application);
        }, function(err) {
          messageService.addMessage('danger', 'The route has not been mapped.', true);
          $log.error(err);
          $modalInstance.dismiss('cancel');
        });
      }, function(err) {
        messageService.addMessage('danger', 'The route has not been added.', true);
        $log.error(err);
        $modalInstance.dismiss('error');
      });


      $scope.application.id = response.data.metadata.guid;
      applicationService.addApplication($scope.application).then(function(responseApp) {

        console.log('dentro');
        
        // set message
        messageService.addMessage('success', 'The application has been successfully added.', 'true');

        // close the modal
        $modalInstance.close();
      }, function(err) {
        // set message
        messageService.addMessage('danger', 'The application has not been added.');
        $log.error(err.data.description);
        $log.error(err.config);
        console.log('fuera');

        // close the modal
        $modalInstance.close();
      });


    }, function(err) {
      // set message
      messageService.addMessage('danger', 'The application has not been added.');
      $log.error(err.data);
      console.log('error aqui');

      // close the modal
      $modalInstance.close();
    });
  };

  $scope.uploadedFile = function(element) {
   $scope.$apply(function($scope) {
     $scope.files = element.files;         
   });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);