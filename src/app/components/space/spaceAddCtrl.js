angular.module('app.space').controller('SpaceAddCtrl', ['$route', '$scope', '$modalInstance', '$log', 'space', 'spaceService', 'messageService', function($route, $scope, $modalInstance, $log, space, spaceService, messageService) {

  $scope.space = {
    organizationId: space.organizationId
  };

  $scope.ok = function () {
    spaceService.addSpace($scope.space, $route.reload()).then(function(response) {
      // set message
      

      // close the modal
      $modalInstance.close();
      messageService.addMessage('success', 'The space has been successfully added.');
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