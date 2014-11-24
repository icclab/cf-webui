angular.module('app.serviceBinding').controller('ServiceBindingAddCtrl', ['$scope', '$modalInstance', 'config', 'serviceBindingService', 'spaceService', 'messageService', function($scope, $modalInstance, config, serviceBindingService, spaceService, messageService) {

  $scope.config = config;
  $scope.alreadyBoundServices = $scope.config.alreadyBoundServices;
  $scope.applicationId = $scope.config.applicationId;
  $scope.services = [];

  // service summary from api
  var getSpaceSummaryPromise = spaceService.getSpaceSummary($scope.config.spaceId);
  getSpaceSummaryPromise.then(function(response) {

    // populate services
    if (response.data.services && response.data.services.length > 0) {
      angular.forEach(response.data.services, function(service, i) {
        var serviceCanBeBound = true;

        angular.forEach($scope.alreadyBoundServices, function(alreadyBoundService, k) {
          if (alreadyBoundService.guid === service.guid) {
            serviceCanBeBound = false;
          }
        });

        if (serviceCanBeBound) {
          var objectService = {
            id: service.guid,
            name: service.name
          };

          $scope.services.push(objectService);
        }
      });
    }
  }, function(err) {
    messageService.addMessage('danger', 'The space summary has not been loaded: ' + err);
  });

  $scope.ok = function () {
    var serviceBinding = {
      serviceInstanceId: $scope.selectedServiceId,
      applicationId: $scope.applicationId
    };

    serviceBindingService.addServiceBinding(serviceBinding).then(function(response) {
      $modalInstance.close(serviceBinding);
      messageService.addMessage('success', 'The service has been successfully bound.');
    }, function(err) {
      messageService.addMessage('danger', 'The service has not been bound: ' + err);
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);