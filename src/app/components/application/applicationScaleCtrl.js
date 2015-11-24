angular.module('app.application').controller('ApplicationScaleCtrl', ['$scope', '$modalInstance', '$log', 'config', 'applicationService', 'messageService', function($scope, $modalInstance, $log, config, applicationService, messageService) {

  $scope.applicationId = config.applicationId;
  $scope.scale = config.scale;

  console.log($scope.scale.memory===$scope.scale.initialMemoryValue);

  $scope.ok = function () {
    applicationService.scaleApplication($scope.applicationId, $scope.scale).then(function(response) {
      applicationService.stopApplication($scope.applicationId).then(function(responseStop) {
        applicationService.startApplication($scope.applicationId).then(function(responseStart) {
          $modalInstance.close();
        }, function(err) {
          $log.error('The application has not been started: ' + err.data.description + ' (' + err.data.error_code + ')');
        });
      }, function(err) {
        $log.error('The application has not been stopped: ' + err.data.description + ' (' + err.data.error_code + ')');
      });
    }, function(err) {
      $log.error('The application has not been scaled: ' + err.data.description + ' (' + err.data.error_code + ')');
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);