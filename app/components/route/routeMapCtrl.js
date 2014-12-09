// route module depends on domain module
angular.module('app.route', ['app.domain']).controller('RouteMapCtrl', ['$scope', '$modalInstance', 'route', 'routeService', 'domainService', 'messageService', function($scope, $modalInstance, route, routeService, domainService, messageService) {
  
  $scope.route = route;
  $scope.existingHosts = [];
  $scope.domains = [];
  
  // domain module dependency
  domainService.getSharedDomainsForTheOrganization($scope.route.organizationID, true).then(function(sharedDomainResponse) {
    angular.forEach(sharedDomainResponse.data.resources, function(sharedDomain, i) {
      $scope.domains.push(sharedDomain);
    });
  }, function(err) {
    //messageService.addMessage('danger', 'Could not load shared domains: ' + err);
  });
  
  // domain module dependency
  domainService.getPrivateDomainsForTheOrganization($scope.route.organizationID, true).then(function(privateDomainResponse) {
    angular.forEach(privateDomainResponse.data.resources, function(privateDomain, i) {
      $scope.domains.push(privateDomain);
    });
  }, function(err) {
    //messageService.addMessage('danger', 'Could not load private domains: ' + err);
  });

  routeService.getRoutesForApp($scope.route.applicationID, true).then(function(hosts) {
    angular.forEach(hosts.data.resources, function(existingHost, i) {
      $scope.existingHosts.push(existingHost.entity.host);
    });
  }, function(err) {
    //messageService.addMessage('danger', 'Could not load application routes: ' + err);
  });
  

  $scope.ok = function () {

    var config = {
      'organizationID' : $scope.route.organizationID,
      'applicationID' : $scope.route.applicationID,
      'domainID' : $scope.selectedDomainID,
      'spaceID' : $scope.route.spaceID,
      'host' : $scope.enteredHost
    };
    
    routeService.mapRoute(config).then(function(mapRouteResponse) {
      angular.forEach($scope.domains, function(domain, i) {
        if(domain.metadata.guid === config.domainID){
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
      $modalInstance.close(mapRouteResponse);
      //messageService.addMessage('success', 'The route has been successfully mapped.');
    }, function(err) {
      //messageService.addMessage('danger', 'The route has not been mapped: ' + err);
    });

  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
}]);