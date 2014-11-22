angular.module('app.organization').controller('OrganizationDeleteCtrl', ['$scope', '$modalInstance', 'organization', 'organizationService', 'messageService', function($scope, $modalInstance, organization, organizationService, messageService) {

  $scope.organization = organization;

  $scope.ok = function () {

    organizationService.deleteOrganization($scope.organization).then(function(response) {
      messageService.addMessage('success', 'The organization has been successfully deleted.');
    }, function(err) {
      messageService.addMessage('danger', 'The organization has not been deleted: ' + err);
    });

    $modalInstance.close($scope.organization);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);