angular.module('app.application').controller('ApplicationDeleteCtrl', ['$route', '$scope', '$modalInstance', '$log', 'applicationId', 'applicationService', 'messageService', function($route, $scope, $modalInstance, $log, applicationId, applicationService, messageService) {

  $scope.applicationId = applicationId;

  $scope.ok = function () {
    applicationService.deleteApplication($scope.applicationId, $route.reload()).then(function(response) {
      messageService.addMessage('success', 'The application has been successfully deleted.');
    }, function(err) {
      messageService.addMessage('danger', 'The application has not been deleted.');
      $log.error(err);
    });

    $modalInstance.close();
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);