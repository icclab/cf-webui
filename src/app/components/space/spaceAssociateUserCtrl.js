angular.module('app.space').controller('SpaceAssociateUserCtrl', ['$route', '$routeParams', '$scope', '$modalInstance', '$log', 'users', 'spaceService', 'organizationService', 'messageService', function($route, $routeParams, $scope, $modalInstance, $log, users, spaceService, organizationService, messageService) {
  $scope.users = users;
  $scope.usersLength = users.length > 0;

  $scope.newUser = {
    name: '',
    spaceManager: false,
    spaceAuditor: false,
    spaceDeveloper: false,
    spaceId: $routeParams.spaceId,
    organizationId: $routeParams.organizationId

  };

  $scope.addSpaceRoles = function () {

    angular.forEach($scope.users, function(user, key) {       

      if (user.spaceManager){
        spaceService.associateManagerWithSpace(user).then(function(response) {
          // set message
          messageService.addMessage('success', 'The space manager has been successfully added.');
          // close the modal
          $modalInstance.close();
        }, function(err) {
          // set message
          messageService.addMessage('danger', 'The space manager has not been added.');
          $log.error(err);
          $modalInstance.close();
        });
      }

      if (user.spaceAuditor){
        spaceService.associateAuditorWithSpace(user).then(function(response) {
          // set message
          messageService.addMessage('success', 'The space auditor has been successfully added.');
          $modalInstance.close();
        }, function(err) {
          // set message
          messageService.addMessage('danger', 'The space auditor has not been added.');
          $log.error(err);
          $modalInstance.close();
        });
      }

      if (user.spaceDeveloper){
        spaceService.associateDeveloperWithSpace(user).then(function(response) {
          // set message
          messageService.addMessage('success', 'The space developer has been successfully added.');
          $modalInstance.close();
        }, function(err) {
          // set message
          messageService.addMessage('danger', 'The space developer has not been added.');
          $log.error(err);
          $modalInstance.close();
        });      
      }
    });
  };

  $scope.ok = function () {
    messageService.removeAllMessages();
    if ($scope.newUser.spaceManager || $scope.newUser.spaceAuditor || $scope.newUser.spaceDeveloper){
        $scope.users.push($scope.newUser);
    }
    angular.forEach($scope.users, function(user, key) {     
      if(user.id===undefined){
        organizationService.associateUserWithOrganization($scope.newUser, $route.reload()).then(function(response) {
          // set message
          messageService.addMessage('success', 'The organization user has been successfully added.');
          if ((users.length-1)===key) $scope.addSpaceRoles();
        }, function(err) {
          // set message
          messageService.addMessage('danger', 'The organization user has not been added.');
          $modalInstance.close();
          $log.error(err);
        });
      }else{
        if ((users.length-1)===key) $scope.addSpaceRoles();
      }
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);