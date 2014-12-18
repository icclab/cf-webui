angular.module('app.route').controller('RouteUnmapCtrl', ['$scope', '$modalInstance', '$log', 'route', 'routeService', 'messageService', function($scope, $modalInstance, $log, route, routeService, messageService) {

  $scope.route = route;

  $scope.ok = function () {
    routeService.unmapRoute($scope.route).then(function(response) {
      $modalInstance.close(route);
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