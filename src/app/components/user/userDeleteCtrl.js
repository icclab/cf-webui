angular.module('app.user').controller('UserDeleteCtrl', ['$scope', '$modalInstance', '$log', 'user', 'userService', 'messageService', function($scope, $modalInstance, $log, user, userService, messageService) {

  $scope.user = user;

  $scope.ok = function () {
    userService.deleteUser($scope.user).then(function(response) {
      messageService.addMessage('success', 'The user has been successfully deleted.');
    }, function(err) {
      messageService.addMessage('danger', 'The user has not been deleted.');
      $log.error(err);
    });

    $modalInstance.close($scope.user);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);