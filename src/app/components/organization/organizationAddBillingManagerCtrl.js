angular.module('app.organization').controller('OrganizationAddBillingManagerCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'organizationService', 'messageService', function($route, $scope, $modalInstance, $log, user, organizationService, messageService) {

  $scope.ok = function () {

    organizationService.associateBillingManagerWithOrganization(user, $route.reload()).then(function(response) {
      messageService.addMessage('success', 'The billing manager has been successfully added.');
    }, function(err) {
      messageService.addMessage('danger', 'The billing manager has not been added.');
      $log.error(err);
    });

    $modalInstance.close($scope.organization);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);