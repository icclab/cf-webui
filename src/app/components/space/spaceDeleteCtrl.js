angular.module('app.space').controller('SpaceDeleteCtrl', ['$q', '$route', '$scope', '$modalInstance', '$log', 'space', 'spaceService', 'applicationService', 'serviceBindingService', 'serviceInstanceService', 'routeService', 'messageService', function($q, $route, $scope, $modalInstance, $log, space, spaceService, applicationService, serviceBindingService, serviceInstanceService, routeService, messageService) {

  $scope.space = space;


  $scope.ok = function () {
    spaceService.deleteSpace($scope.space).then(function(response) {
      messageService.addMessage('success', 'The space has been successfully deleted.');
      $modalInstance.close($scope.space);
    }, function(err) {
      messageService.addMessage('danger', 'The space has not been deleted.');
      $log.error(err.data.description);
      $modalInstance.close($scope.space);
    });
  };

  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);