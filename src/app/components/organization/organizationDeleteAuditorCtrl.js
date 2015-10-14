angular.module('app.organization').controller('OrganizationDeleteAuditorCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'organizationService', 'messageService', function($route, $scope, $modalInstance, $log, user, organizationService, messageService) {

  $scope.ok = function () {

    organizationService.disassociateAuditorWithOrganization(user).then(function(response) {
      messageService.addMessage('success', 'The auditor has been successfully deleted.');
    }, function(err) {
      messageService.addMessage('danger', 'The auditor has not been deleted.');
      $log.error(err);
    });

    $modalInstance.close();
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);