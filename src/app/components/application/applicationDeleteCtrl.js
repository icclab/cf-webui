angular.module('app.application').controller('ApplicationDeleteCtrl', ['$route', '$scope', '$modalInstance', '$log', 'applicationId', 'applicationService', 'serviceBindingService', 'messageService', function($route, $scope, $modalInstance, $log, applicationId, applicationService, serviceBindingService, messageService) {

  $scope.applicationId = applicationId;

  $scope.ok = function () {
    applicationService.getServiceBindings(applicationId).then(function(responseServiceBinding){
      if (responseServiceBinding.data.total_results ===0){
        applicationService.deleteApplication($scope.applicationId).then(function(response) {
          messageService.addMessage('success', 'The application has been successfully deleted.');
          $modalInstance.close();
        }, function(err) {
          messageService.addMessage('danger', 'The application has not been deleted.');
          $modalInstance.close();
          $log.error(err);
        });
      }else{
        angular.forEach(responseServiceBinding.data.resources, function(serviceBinding, i) {
          serviceBindingService.deleteServiceBinding(serviceBinding.metadata.guid).then(function(response) {
            applicationService.deleteApplication($scope.applicationId, $route.reload()).then(function(response) {
              messageService.addMessage('success', 'The application has been successfully deleted.');
              $modalInstance.close();
            }, function(err) {
              messageService.addMessage('danger', 'The application has not been deleted.');
              $modalInstance.close();
              $log.error(err);
            }); 
          });
        });
      }
      
    });

  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);