angular.module('app.serviceBinding').controller('ServiceBindingDeleteCtrl', ['$scope', '$modalInstance', '$log', 'service', 'serviceBindingService', 'messageService', function($scope, $modalInstance, $log, service, serviceBindingService, messageService) {

  $scope.service = service;

  $scope.ok = function () {
    serviceBindingService.deleteServiceBinding($scope.service.serviceBindingId).then(function(response) {
      $modalInstance.close($scope.service);
      messageService.addMessage('success', 'The service has been successfully unbound.');
    }, function(err) {
      messageService.addMessage('danger', 'The service has not been unbound.');
      $log.error(err);
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);