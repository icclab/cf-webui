angular.module('app.serviceInstance').controller('ServiceInstanceDeleteCtrl', ['$scope', '$q', '$modalInstance', '$log', 'serviceInstance', 'serviceInstanceService', 'serviceBindingService', 'messageService', function($scope, $q, $modalInstance, $log, serviceInstance, serviceInstanceService, serviceBindingService, messageService) {

  $scope.serviceInstance = serviceInstance;
  $scope.serviceBindings = [];

  serviceInstanceService.getServiceBindingsForServiceInstance(serviceInstance.id).then(function(response){
    angular.forEach(response.data.resources, function(serviceBinding, key){
      var objectServiceBinding = {
        id: serviceBinding.metadata.guid
      };
      $scope.serviceBindings.push(objectServiceBinding);
    });
  });

  $scope.ok = function () {
    angular.forEach($scope.serviceBindings, function(serviceBinding, key){
    });

    $scope.deleteServiceBindings($scope.serviceBindingId).then(function(response) {
      serviceInstanceService.deleteServiceInstance($scope.serviceInstance.id).then(function(response) {
        messageService.addMessage('success', 'The service instance has been successfully deleted.');

        $modalInstance.close($scope.serviceInstance);
      }, function(err) {
        messageService.addMessage('danger', 'The service instance has not been deleted.');
        $log.error(err);

        $modalInstance.dismiss('cancel');
      });
    }, function(err) {
      messageService.addMessage('danger', 'The service has not been unbound.');
      $log.error(err);
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.deleteServiceBindings = function () {
    var promises = [];
    angular.forEach($scope.serviceBindings, function(serviceBinding, key){
      promises.push(serviceBindingService.deleteServiceBinding(serviceBinding.id));
    });
    return $q.all(promises);
  };
}]);