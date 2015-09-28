angular.module('app.application').controller('UserEnvAddCtrl', ['$scope', '$modalInstance', '$log', 'config', 'applicationService', 'messageService', function($scope, $modalInstance, $log, config, applicationService, messageService) {

  $scope.applicationId = config.applicationId;
  $scope.userEnvs = config.existingUserEnvs;

  $scope.ok = function() {
    // add new user env
    $scope.userEnvs[$scope.env.key] = $scope.env.value;
    
    applicationService.editApplicationEnv($scope.applicationId, $scope.userEnvs).then(function(response) {
      $modalInstance.close();
      messageService.addMessage('success', 'The environment variable has been successfully added.');
    }, function(err) {
      messageService.addMessage('danger', 'The environment variable has not been added.');
      $log.error(err);
    });
  };
  
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);