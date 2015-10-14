angular.module('app.space').controller('SpaceAddManagerCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'spaceService', 'messageService', function($route, $scope, $modalInstance, $log, user, spaceService, messageService) {

  $scope.ok = function () {

    spaceService.associateManagerWithSpace(user).then(function(response) {
      messageService.addMessage('success', 'The manager has been successfully added.', true);
      $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The manager has not been added.', true);
      $modalInstance.close();
      $log.error(err);
    });

  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);