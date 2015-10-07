angular.module('app.organization').controller('OrganizationDeleteUserCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'organizationService', 'messageService', function($route, $scope, $modalInstance, $log, user, organizationService, messageService) {

  $scope.ok = function () {

    organizationService.disassociateUserWithOrganization(user, $route.reload()).then(function(response) {
      messageService.addMessage('success', 'The user has been successfully removed from organization.');
    }, function(err) {
      messageService.addMessage('danger', 'The user has not been removed from organization.');
      $log.error(err);
    });

    $modalInstance.close($scope.organization);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);