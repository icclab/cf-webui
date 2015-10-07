angular.module('app.organization').controller('OrganizationDeleteManagerCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'organizationService', 'messageService', function($route, $scope, $modalInstance, $log, user, organizationService, messageService) {

  $scope.ok = function () {

    organizationService.disassociateManagerWithOrganization(user, $route.reload()).then(function(response) {
      messageService.addMessage('success', 'The manager has been successfully deleted.');
    }, function(err) {
      messageService.addMessage('danger', 'The manager has not been deleted.');
      $log.error(err);
    });

    $modalInstance.close($scope.organization);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);