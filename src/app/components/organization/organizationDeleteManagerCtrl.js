angular.module('app.organization').controller('OrganizationDeleteManagerCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'organizationService', 'messageService', function($route, $scope, $modalInstance, $log, user, organizationService, messageService) {

  $scope.ok = function () {

    organizationService.disassociateManagerWithOrganization(user).then(function(response) {
      messageService.addMessage('success', 'The manager has been successfully deleted.', true);
      $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The manager has not been deleted.', true);
      $modalInstance.close();
      $log.error(err);
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);