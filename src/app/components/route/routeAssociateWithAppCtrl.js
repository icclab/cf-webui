// route module depends on domain module
angular.module('app.routes').controller('RouteAssociateWithAppCtrl', ['$scope', '$modalInstance', '$log', 'routeId', 'applications', 'routeService', 'messageService', function($scope, $modalInstance, $log, routeId, applications, routeService, messageService) {
  
  $scope.routeId = routeId;
  $scope.applications = applications;
  $scope.applicationId = null;

  $scope.ok = function () {
    routeService.associateRouteWithApp($scope.routeId, $scope.application.id).then(function(mapRouteResponse) {
      messageService.addMessage('success', 'The route has been successfully mapped.', true);
      $modalInstance.close($scope.application);
    }, function(err) {
      messageService.addMessage('danger', 'The route has not been mapped.', true);
      $log.error(err);
      $modalInstance.dismiss('cancel');
    });

  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
}]);