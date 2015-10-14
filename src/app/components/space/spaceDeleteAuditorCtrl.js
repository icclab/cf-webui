angular.module('app.space').controller('SpaceDeleteAuditorCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'spaceService', 'messageService', function($route, $scope, $modalInstance, $log, user, spaceService, messageService) {

  $scope.ok = function () {

    spaceService.disassociateAuditorWithSpace(user).then(function(response) {
      messageService.addMessage('success', 'The auditor has been successfully deleted.', true);
      $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The auditor has not been deleted.', true);
      $log.error(err);
      $modalInstance.close();
    });

  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);