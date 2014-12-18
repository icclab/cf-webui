angular.module('app.space').controller('SpaceDeleteCtrl', ['$scope', '$modalInstance', '$log', 'space', 'spaceService', 'messageService', function($scope, $modalInstance, $log, space, spaceService, messageService) {

  $scope.space = space;

  $scope.ok = function () {
    spaceService.deleteSpace($scope.space).then(function(response) {
      messageService.addMessage('success', 'The space has been successfully deleted.');
    }, function(err) {
      messageService.addMessage('danger', 'The space has not been deleted.');
      $log.error(err);
    });

    $modalInstance.close($scope.space);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);