angular.module('app.organization').controller('OrganizationDeleteBillingManagerCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'organizationService', 'messageService', function($route, $scope, $modalInstance, $log, user, organizationService, messageService) {

  $scope.ok = function () {

    organizationService.disassociateBillingManagerWithOrganization(user, $route.reload()).then(function(response) {
      messageService.addMessage('success', 'The billing manager has been successfully deleted.');
    }, function(err) {
      messageService.addMessage('danger', 'The billing manager has not been deleted.');
      $log.error(err);
    });

    $modalInstance.close();
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);