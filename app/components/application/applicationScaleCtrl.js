angular.module('app.application').controller('ApplicationScaleCtrl', ['$scope', '$modalInstance', 'config', 'applicationService', 'messageService', function($scope, $modalInstance, config, applicationService, messageService) {

  $scope.applicationId = config.applicationId;
  $scope.scale = config.scale;

  $scope.ok = function () {
    applicationService.scaleApplication($scope.applicationId, $scope.scale).then(function(response) {
      applicationService.stopApplication($scope.applicationId).then(function(responseStop) {
        applicationService.startApplication($scope.applicationId).then(function(responseStart) {
          $modalInstance.close();
        }, function(err) {
          console.log('The application has not been started: ' + err.data.description + ' (' + err.data.error_code + ')');
        });
      }, function(err) {
        console.log('The application has not been stopped: ' + err.data.description + ' (' + err.data.error_code + ')');
      });
    }, function(err) {
      console.log('The application has not been scaled: ' + err.data.description + ' (' + err.data.error_code + ')');
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);