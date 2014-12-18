angular.module('app.application').controller('UserEnvEditCtrl', ['$scope', '$modalInstance', '$log', 'config', 'applicationService', 'messageService', function($scope, $modalInstance, $log, config, applicationService, messageService) {

  $scope.applicationId = config.applicationId;
  $scope.userEnvs = config.existingUserEnvs;
  $scope.env = config.userEnvToEdit;

  $scope.ok = function() {
    // edit user env
    $scope.userEnvs[$scope.env.key] = $scope.env.value;
    
    applicationService.editApplicationEnv($scope.applicationId, $scope.userEnvs).then(function(response) {
      $modalInstance.close();
      messageService.addMessage('success', 'The environment variable has been successfully edited.');
    }, function(err) {
      messageService.addMessage('danger', 'The environment variable has not been edited.');
      $log.error(err);
    });
  };
  
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);