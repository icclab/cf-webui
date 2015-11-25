angular.module('app.routes').controller('RouteAddCtrl', ['$scope', '$modalInstance', '$log', 'route', 'routeService', 'organizationService', 'messageService', function($scope, $modalInstance, $log, route, routeService, organizationService, messageService) {

  $scope.route = route;

  // domain info
  $scope.domains = [];
  $scope.nrOfDomains = 0;
  $scope.domainId = null;

  // get organization sharedDomains
  organizationService.getSharedDomainsForTheOrganization(route.orgId).then(function(response) {
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
  organizationService.getPrivateDomainsForTheOrganization(route.orgId).then(function(response) {
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
    $scope.route.domainId = $scope.domainId;
    routeService.createRoute($scope.route).then(function(response) {
      messageService.addMessage('success', 'The route has been successfully added.');
     $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The route has not been added.');
      $log.error(err);
      $modalInstance.dismiss('error');
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);