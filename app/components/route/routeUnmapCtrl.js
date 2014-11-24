angular.module('app.route').controller('RouteUnmapCtrl', ['$scope', '$modalInstance', 'route', 'routeService', 'messageService', function($scope, $modalInstance, route, routeService, messageService) {

  $scope.route = route;

  $scope.ok = function () {
    routeService.unmapRoute($scope.route).then(function(response) {
      $modalInstance.close(route);
      messageService.addMessage('success', 'The route has been successfully unmapped.');
    }, function(err) {
      messageService.addMessage('danger', 'The route has not been unmapped: ' + err);
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);