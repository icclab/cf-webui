angular.module('app.space').controller('SpaceEditCtrl', ['$scope', '$modalInstance', '$log', 'space', 'spaceService', 'messageService', function($scope, $modalInstance, $log, space, spaceService, messageService) {

  $scope.space = space;

  $scope.ok = function () {
    spaceService.editSpace($scope.space).then(function(response) {
      messageService.addMessage('success', 'The space has been successfully changed.');
    }, function(err) {
      messageService.addMessage('danger', 'The space has not been changed.');
      $log.error(err);
    });

    $modalInstance.close($scope.space);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);