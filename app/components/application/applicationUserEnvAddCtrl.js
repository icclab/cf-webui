angular.module('app.application').controller('UserEnvAddCtrl', ['$scope', '$modalInstance', 'config', 'applicationService', 'messageService', function($scope, $modalInstance, config, applicationService, messageService) {

  $scope.applicationId = config.applicationId;
  $scope.userEnvs = config.existingUserEnvs;

  $scope.ok = function() {
    // add new user env
    $scope.userEnvs[$scope.env.key] = $scope.env.value;
    
    applicationService.editApplicationEnv($scope.applicationId, $scope.userEnvs).then(function(response) {
      $modalInstance.close();
      messageService.addMessage('success', 'The environment variable has been successfully added.');
    }, function(err) {
      messageService.addMessage('danger', 'The environment variable has not been added: ' + err);
    });
  };
  
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);