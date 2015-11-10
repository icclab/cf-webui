angular.module('app.organization').controller('OrganizationAddCtrl', ['$route', '$scope', '$modalInstance', '$log', 'organization', 'organizationService', 'messageService', function($route, $scope, $modalInstance, $log, organization, organizationService, messageService) {

  $scope.ok = function () {
    
    organizationService.addOrganization($scope.organization).then(function(response) {

      $route.reload();
      
      // set message
      messageService.addMessage('success', 'The organization has been successfully added.', 'true');

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