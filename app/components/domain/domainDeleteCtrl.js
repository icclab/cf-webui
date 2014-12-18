angular.module('app.domain').controller('DomainDeleteCtrl', ['$scope', '$modalInstance', '$log', 'domain', 'domainService', 'messageService', function($scope, $modalInstance, $log, domain, domainService, messageService) {

  $scope.domain = domain;

  $scope.ok = function () {
    domainService.deleteDomain($scope.domain).then(function(response) {
      messageService.addMessage('success', 'The domain has been successfully deleted.');
    }, function(err) {
      messageService.addMessage('danger', 'The domain has not been deleted.');
      $log.error(err);
    });

    $modalInstance.close($scope.domain);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);