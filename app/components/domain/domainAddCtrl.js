angular.module('app.domain').controller('DomainAddCtrl', ['$scope', '$modalInstance', 'domain', 'domainService', 'messageService', function($scope, $modalInstance, domain, domainService, messageService) {

  $scope.domain = domain;

  $scope.ok = function () {
    domainService.addDomain($scope.domain).then(function(response) {
      $modalInstance.close(response.data);
      messageService.addMessage('success', 'The domain has been successfully added.');
    }, function(err) {
      messageService.addMessage('danger', 'The domain has not been added: ' + err);
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);