angular.module('app.organization').controller('OrganizationAddAuditorCtrl', ['$route', '$scope', '$modalInstance', '$log', 'user', 'organizationService', 'messageService', function($route, $scope, $modalInstance, $log, user, organizationService, messageService) {

  $scope.ok = function () {

    organizationService.associateAuditorWithOrganization(user, $route.reload()).then(function(response) {
      messageService.addMessage('success', 'The auditor has been successfully added.');
    }, function(err) {
      messageService.addMessage('danger', 'The auditor has not been added.');
      $log.error(err);
    });

    $modalInstance.close($scope.organization);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);