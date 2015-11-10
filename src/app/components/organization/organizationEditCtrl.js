angular.module('app.organization').controller('OrganizationEditCtrl', ['$scope', '$route', '$modalInstance', '$log', 'organization', 'organizationService', 'messageService', function($scope, $route, $modalInstance, $log, organization, organizationService, messageService) {

  $scope.organization = organization;

  $scope.ok = function () {

    organizationService.editOrganization($scope.organization).then(function(response) {
      messageService.addMessage('success', 'The organization name has been successfully changed.');
    }, function(err) {
      messageService.addMessage('danger', 'The organization name has not been changed.');
      $log.error(err.data.description);
    });

    $modalInstance.close($scope.organization);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);