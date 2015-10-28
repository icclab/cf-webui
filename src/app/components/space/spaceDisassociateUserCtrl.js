angular.module('app.space').controller('SpaceDisassociateUserCtrl', ['$route', '$routeParams', '$scope', '$modalInstance', '$log', 'user', 'spaceService', 'organizationService', 'messageService', function($route, $routeParams, $scope, $modalInstance, $log, user, spaceService, organizationService, messageService) {

  $scope.ok = function () { 
    messageService.removeAllMessages();     

      if (user.spaceManager){
        spaceService.disassociateManagerWithSpace(user).then(function(response) {
          // set message
          messageService.addMessage('success', 'The space manager has been successfully deleted.');
          // close the modal
          $modalInstance.close();
        }, function(err) {
          // set message
          messageService.addMessage('danger', 'The space manager has not been deleted.');
          $log.error(err);
          $modalInstance.close();
        });
      }

      if (user.spaceAuditor){
        spaceService.disassociateAuditorWithSpace(user).then(function(response) {
          // set message
          messageService.addMessage('success', 'The space auditor has been successfully deleted.');
          $modalInstance.close();
        }, function(err) {
          // set message
          messageService.addMessage('danger', 'The space auditor has not been deleted.');
          $log.error(err);
          $modalInstance.close();
        });
      }

      if (user.spaceDeveloper){
        spaceService.disassociateDeveloperWithSpace(user).then(function(response) {
          // set message
          messageService.addMessage('success', 'The space developer has been successfully deleted.');
          $modalInstance.close();
        }, function(err) {
          // set message
          messageService.addMessage('danger', 'The space developer has not been deleted.');
          $log.error(err);
          $modalInstance.close();
        });      
      }

  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);