angular.module('app.space').controller('SpaceAssociateUserCtrl', ['$q','$route', '$routeParams', '$scope', '$modalInstance', '$log', 'users', 'spaceService', 'organizationService', 'messageService', function($q, $route, $routeParams, $scope, $modalInstance, $log, users, spaceService, organizationService, messageService) {
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

  $scope.addSpaceRoles = function (spaceUsers) {
    var promises = []; 

    angular.forEach(spaceUsers, function(user, key) {     

      if (user.spaceManager){
        promises.push(spaceService.associateManagerWithSpace(user));
      }
      if (user.spaceAuditor){
        promises.push(spaceService.associateAuditorWithSpace(user));
      }
      if (user.spaceDeveloper){
        promises.push(spaceService.associateDeveloperWithSpace(user));
      }

    });

    return $q.all(promises);

  };

  $scope.ok = function () {
    if ($scope.newUser.name!=="") $scope.users.push($scope.newUser);
    messageService.removeAllMessages();
    $scope.addSpaceRoles($scope.users).then(function(){
      messageService.addMessage('success', 'The space user has been successfully added.');
      $modalInstance.close();
    }, function(err){
      messageService.addMessage('danger', 'The space user has not been added.');
      $modalInstance.dismiss('cancel');
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);