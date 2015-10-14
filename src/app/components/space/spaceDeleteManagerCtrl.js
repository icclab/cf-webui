angular.module('app.space').controller('SpaceDeleteManagerCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'spaceService', 'messageService', function($route, $scope, $modalInstance, $log, user, spaceService, messageService) {

  $scope.ok = function () {

    spaceService.disassociateManagerWithSpace(user).then(function(response) {
      messageService.addMessage('success', 'The manager has been successfully deleted.', true);
      $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The manager has not been deleted.', true);
      $log.error(err);
    });

  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);