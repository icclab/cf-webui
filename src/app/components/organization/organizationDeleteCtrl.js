angular.module('app.organization').controller('OrganizationDeleteCtrl', ['$route', '$scope', '$modalInstance', '$log', 'organization', 'organizationService', 'messageService', function($route, $scope, $modalInstance, $log, organization, organizationService, messageService) {

  $scope.organization = organization;

  $scope.ok = function () {

    organizationService.deleteOrganization($scope.organization, $route.reload()).then(function(response) {
      messageService.addMessage('success', 'The organization has been successfully deleted.');
    }, function(err) {
      messageService.addMessage('danger', 'The organization has not been deleted.');
      $log.error(err);
    });

    $modalInstance.close($scope.organization);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);