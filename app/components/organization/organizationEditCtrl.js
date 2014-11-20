angular.module('app.organization').controller('OrganizationEditCtrl', ['$scope', '$modalInstance', 'organization', 'organizationService', 'messageService', function($scope, $modalInstance, organization, organizationService, messageService) {

  $scope.organization = organization;

  $scope.ok = function () {

    organizationService.editOrganization($scope.organization).then(function(response) {
      messageService.addMessage('success', 'The organization name has been successfully changed.');
    }, function(err) {
      messageService.addMessage('danger', 'The organization name has not been changed: ' + err);
    });

    $modalInstance.close($scope.organization);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);