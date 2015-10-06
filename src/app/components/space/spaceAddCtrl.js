angular.module('app.space').controller('SpaceAddCtrl', ['$route', '$scope', '$modalInstance', '$log', 'space', 'spaceService', 'messageService', function($route, $scope, $modalInstance, $log, space, spaceService, messageService) {

  $scope.space = {
    organizationId: space.organizationId
  };

  $scope.ok = function () {
    spaceService.addSpace($scope.space).then(function(response) {
      // close the modal
      $route.reload();
      $modalInstance.close();
      // set message
      messageService.addMessage('success', 'The space has been successfully added.', 'true');
    }, function(err) {
      // set message
      messageService.addMessage('danger', 'The space has not been added.');
      $log.error(err);

      // close the modal
      $modalInstance.close();
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);