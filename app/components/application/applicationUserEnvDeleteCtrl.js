angular.module('app.application').controller('UserEnvDeleteCtrl', ['$scope', '$modalInstance', '$log', 'config', 'applicationService', 'messageService', function($scope, $modalInstance, $log, config, applicationService, messageService) {
  $scope.applicationId = config.applicationId;
  $scope.userEnvs = config.existingUserEnvs;
  $scope.userEnvToDelete = config.userEnvToDelete;

  $scope.ok = function() {
    // delete user env
    delete $scope.userEnvs[$scope.userEnvToDelete];
    
    applicationService.editApplicationEnv($scope.applicationId, $scope.userEnvs).then(function(response) {
      $modalInstance.close();
      messageService.addMessage('success', 'The environment variable has been successfully deleted.');
    }, function(err) {
      messageService.addMessage('danger', 'The environment variable has not been deleted.');
      $log.error(err);
    });
  };
  
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);