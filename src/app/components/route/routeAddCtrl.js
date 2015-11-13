angular.module('app.routes').controller('RouteAddCtrl', ['$scope', '$modalInstance', '$log', 'route', 'routeService', 'organizationService', 'messageService', function($scope, $modalInstance, $log, route, routeService, organizationService, messageService) {

  $scope.route = route;

  // domain info
  $scope.domains = [];
  $scope.nrOfDomains = 0;
  $scope.domainId = null;

  // get organization sharedDomains
  organizationService.getSharedDomainsForTheOrganization($scope.id).then(function(response) {
    var data = response.data;
    $scope.nrOfDomains += 1;
    //$scope.sharedDomains = (data.resources);
    angular.forEach(data.resources, function(sharedDomain, i){
      var sharedDomainObject = {
        id: sharedDomain.metadata.guid,
        name: sharedDomain.entity.name
      };
      $scope.domains.push(sharedDomainObject);
      console.log(sharedDomainObject.id);
    });
  }, function(err) {
    $log.error(err.data.description);
  });
  
  // get organization privateDomains
  organizationService.getPrivateDomainsForTheOrganization($scope.id).then(function(response) {
    var data = response.data;
    $scope.nrOfDomains += data.total_results;
    //$scope.privateDomains = data.resources;
    angular.forEach(data.resources, function(privateDomain, i){
      var privateDomainObject = {
        id: privateDomain.metadata.guid,
        name: privateDomain.entity.name
      };
      $scope.domains.push(privateDomainObject);
      console.log(privateDomainObject.id);
    });
  }, function(err) {
    $log.error(err);
  });

  $scope.ok = function () {
    console.log($scope.domainId);
    $scope.route.domainId = $scope.domainId;
    console.log($scope.route);
    routeService.createRoute($scope.route).then(function(response) {
      messageService.addMessage('success', 'The route has been successfully added.', true);
     $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The route has not been added.', true);
      $log.error(err);
      $modalInstance.dismiss('error');
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);