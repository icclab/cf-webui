angular.module('app.space').controller('SpaceDeleteDeveloperCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'spaceService', 'messageService', function($route, $scope, $modalInstance, $log, user, spaceService, messageService) {

  $scope.ok = function () {

    spaceService.disassociateDeveloperWithSpace(user).then(function(response) {
      messageService.addMessage('success', 'The developer has been successfully deleted.', true);
      $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The developer has not been deleted.', true);
      $log.error(err);
      $modalInstance.close();
    });

  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);