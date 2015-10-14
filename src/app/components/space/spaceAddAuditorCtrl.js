angular.module('app.space').controller('SpaceAddAuditorCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'spaceService', 'messageService', function($route, $scope, $modalInstance, $log, user, spaceService, messageService) {

  $scope.ok = function () {

    spaceService.associateAuditorWithSpace(user).then(function(response) {
      messageService.addMessage('success', 'The auditor has been successfully added.', true);
      $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The auditor has not been added.', true);
      $log.error(err);
      $modalInstance.close();
    });

  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);