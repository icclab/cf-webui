angular.module('app.serviceBinding').controller('ServiceBindingDeleteCtrl', ['$scope', '$modalInstance', 'service', 'serviceBindingService', 'messageService', function($scope, $modalInstance, service, serviceBindingService, messageService) {

  $scope.service = service;

  $scope.ok = function () {
    serviceBindingService.deleteServiceBinding($scope.service.serviceBindingId).then(function(response) {
      $modalInstance.close($scope.service);
      console.log(response);
      messageService.addMessage('success', 'The service has been successfully unbound.');
    }, function(err) {
      messageService.addMessage('danger', 'The service has not been unbound: ' + err);
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);