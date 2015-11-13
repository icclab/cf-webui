// route module depends on domain module
angular.module('app.routes').controller('RouteMapCtrl', ['$scope', '$modalInstance', '$log', 'route', 'routeService', 'domainService', 'messageService', function($scope, $modalInstance, $log, route, routeService, domainService, messageService) {
  
  $scope.route = route;
  $scope.existingHosts = [];
  $scope.domains = [];
  
  // domain module dependency
  domainService.getSharedDomainsForTheOrganization($scope.route.organizationId, true).then(function(sharedDomainResponse) {
    angular.forEach(sharedDomainResponse.data.resources, function(sharedDomain, i) {
      $scope.domains.push(sharedDomain);
    });
  }, function(err) {
    $log.error(err);
  });
  
  // domain module dependency
  domainService.getPrivateDomainsForTheOrganization($scope.route.organizationId, true).then(function(privateDomainResponse) {
    angular.forEach(privateDomainResponse.data.resources, function(privateDomain, i) {
      $scope.domains.push(privateDomain);
    });
  }, function(err) {
    $log.error(err);
  });

  routeService.getRoutesForApp($scope.route.applicationId, true).then(function(hosts) {
    angular.forEach(hosts.data.resources, function(existingHost, i) {
      $scope.existingHosts.push(existingHost.entity.host);
    });
  }, function(err) {
    $log.error(err);
  });
  

  $scope.ok = function () {

    var config = {
      'organizationId' : $scope.route.organizationId,
      'applicationId' : $scope.route.applicationId,
      'domainId' : $scope.selectedDomainId,
      'spaceId' : $scope.route.spaceId,
      'host' : $scope.enteredHost
    };
    
    routeService.mapRoute(config).then(function(mapRouteResponse) {
      angular.forEach($scope.domains, function(domain, i) {
        if(domain.metadata.guid === config.domainId){
          // inject domain object
          var domainInjection = {
            guid : domain.metadata.guid,
            name : domain.entity.name
          };
          mapRouteResponse.domain = domainInjection;
          mapRouteResponse.host = config.host;
          mapRouteResponse.guid = mapRouteResponse.data.metadata.guid;
        }
      });
      messageService.addMessage('success', 'The route has been successfully mapped.');
      $modalInstance.close(mapRouteResponse);
    }, function(err) {
      messageService.addMessage('danger', 'The route has not been mapped.');
      $log.error(err);
    });

  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
}]);