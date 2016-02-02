angular.module('app.routes').controller('RouteUnmapCtrl', ['$scope', '$modalInstance', '$log', 'route', 'routeService', 'messageService', function($scope, $modalInstance, $log, route, routeService, messageService) {

  $scope.route = route;
  $scope.application = {
    'id': $scope.route.applicationId
  };
  $scope.applications = route.apps;

  $scope.ok = function () {
    $scope.route.applicationId = $scope.application.id;
    routeService.unmapRoute($scope.route).then(function(response) {
      $modalInstance.close(route, $scope.application);
      messageService.addMessage('success', 'The route has been successfully unmapped.');
    }, function(err) {
      messageService.addMessage('danger', 'The route has not been unmapped.');
      $log.error(err);
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);