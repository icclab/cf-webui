angular.module('app.routes').controller('RouteDeleteCtrl', ['$scope', '$modalInstance', '$log', 'routeId', 'routeService', 'messageService', function($scope, $modalInstance, $log, routeId, routeService, messageService) {
  $scope.ok = function () {
    routeService.deleteRoute(routeId).then(function(response) {
      messageService.addMessage('success', 'The route has been successfully deleted.', true);
      $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The route has not been deleted.', true);
      $log.error(err);
      $modalInstance.dismiss('cancel');
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);