angular.module('app.space').controller('SpaceAddDeveloperCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'spaceService', 'messageService', function($route, $scope, $modalInstance, $log, user, spaceService, messageService) {

  $scope.ok = function () {

    spaceService.associateDeveloperWithSpace(user).then(function(response) {
      messageService.addMessage('success', 'The developer has been successfully added.', true);
      $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The developer has not been added.', true);
      $log.error(err);
      $modalInstance.close();
    });

  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);