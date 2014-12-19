angular.module('app.organization').controller('OrganizationAddCtrl', ['$scope', '$modalInstance', '$log', 'organization', 'organizationService', 'messageService', function($scope, $modalInstance, $log, organization, organizationService, messageService) {

  $scope.ok = function () {
    
    organizationService.addOrganization($scope.organization.name).then(function(response) {
      
      // set message
      messageService.addMessage('success', 'The organization has been successfully added.');

      // close the modal
      $modalInstance.close();
    }, function(err) {
      // set message
      messageService.addMessage('danger', 'The organization has not been added.');
      $log.error(err);

      // close the modal
      $modalInstance.close();
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);