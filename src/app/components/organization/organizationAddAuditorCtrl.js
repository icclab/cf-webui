angular.module('app.organization').controller('OrganizationAddAuditorCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'organizationService', 'messageService', function($route, $scope, $modalInstance, $log, user, organizationService, messageService) {

  $scope.ok = function () {

    organizationService.associateAuditorWithOrganization(user).then(function(response) {
      messageService.addMessage('success', 'The auditor has been successfully added.', true);
      $modalInstance.close();
    }, function(err) {
      messageService.addMessage('danger', 'The auditor has not been added.', true);
      $modalInstance.close();
      $log.error(err);
    });    
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);