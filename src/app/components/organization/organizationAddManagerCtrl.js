angular.module('app.organization').controller('OrganizationAddManagerCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'organizationService', 'messageService', function($route, $scope, $modalInstance, $log, user, organizationService, messageService) {

  $scope.ok = function () {

    organizationService.associateManagerWithOrganization(user, $route.reload()).then(function(response) {
      messageService.addMessage('success', 'The manager has been successfully added.');
    }, function(err) {
      messageService.addMessage('danger', 'The manager has not been added.');
      $log.error(err);
    });

    $modalInstance.close($scope.organization);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);