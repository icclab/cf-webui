angular.module('app.organization').controller('OrganizationDeleteAuditorCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'organizationService', 'messageService', function($route, $scope, $modalInstance, $log, user, organizationService, messageService) {

  $scope.ok = function () {

    organizationService.disassociateAuditorWithOrganization(user).then(function(response) {
      messageService.addMessage('success', 'The auditor has been successfully deleted.', true);
      $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The auditor has not been deleted.', true);
      $modalInstance.close();
      $log.error(err);
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);