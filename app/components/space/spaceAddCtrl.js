angular.module('app.space').controller('SpaceAddCtrl', ['$scope', '$modalInstance', 'space', 'spaceService', 'messageService', function($scope, $modalInstance, space, spaceService, messageService) {

  $scope.space = {
    organizationId: space.organizationId
  };

  $scope.ok = function () {
    spaceService.addSpace($scope.space).then(function(response) {
      // set message
      messageService.addMessage('success', 'The space has been successfully added.');

      // close the modal
      $modalInstance.close();
    }, function(err) {
      // set message
      messageService.addMessage('danger', 'The space has not been addedd: ' + err);

      // close the modal
      $modalInstance.close();
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);