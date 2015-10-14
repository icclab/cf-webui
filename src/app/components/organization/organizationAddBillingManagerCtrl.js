angular.module('app.organization').controller('OrganizationAddBillingManagerCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'organizationService', 'messageService', function($route, $scope, $modalInstance, $log, user, organizationService, messageService) {

  $scope.ok = function () {

    organizationService.associateBillingManagerWithOrganization(user).then(function(response) {
      messageService.addMessage('success', 'The billing manager has been successfully added.', true);
      $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The billing manager has not been added.', true);
      $modalInstance.close();
      $log.error(err);
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);