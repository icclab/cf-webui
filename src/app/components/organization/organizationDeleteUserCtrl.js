angular.module('app.organization').controller('OrganizationDeleteUserCtrl', ['$q', '$route', '$scope', '$modalInstance', '$log', 'user', 'spaces', 'organizationService', 'spaceService', 'messageService', function($q, $route, $scope, $modalInstance, $log, user, spaces, organizationService, spaceService, messageService) {

  $scope.ok = function () {
    $scope.disassociateSpacesUser(user, spaces).then(function(responseUser){
      $scope.deleteOrganizationUserRoles(user).then(function(response){
        organizationService.disassociateUserWithOrganization(user, $route.reload()).then(function(response) {
          messageService.addMessage('success', 'The user has been successfully removed from organization.');
          $modalInstance.close($scope.organization);
        }, function(err) {
          messageService.addMessage('danger', 'An error ocurred while removing the user from the organization.');
          $modalInstance.close($scope.organization);
          $log.error(err.data.description);
        });
      }, function(err) {
        $log.error(err);
        messageService.addMessage('danger', 'An error ocurred while removing the user from the organization .');
        $modalInstance.close($scope.organization);
      });
    }, function(err) {
      $log.error(err);
      messageService.addMessage('danger', 'An error ocurred while removing the user from the spaces.');
      $modalInstance.close($scope.organization);
    });
  };

  $scope.disassociateSpacesUser = function(user, spaces){
    var promises = [];
    angular.forEach(spaces, function(space, i) {
      var deferred = $q.defer();
      spaceService.retrieveRolesOfAllUsersForTheSpace(space.id).then(function(responseSpaceUsersRoles){     
        var userIsInSpace = false;
        angular.forEach(responseSpaceUsersRoles.data.resources, function(spaceUserRoles, j) {
          if (spaceUserRoles.metadata.guid===user.id) {
            userIsInSpace = true;
            var spaceUser = {
              id: user.id,
              name: user.name,
              spaceDeveloper: false,
              spaceManager: false,
              spaceAuditor: false,
              spaceId: space.id,
              spaceName: space.name
            };
            angular.forEach(spaceUserRoles.entity.space_roles, function(userRole, k) {
              if (userRole === 'space_developer'){
                spaceUser.spaceDeveloper = true;
              }
              if (userRole === 'space_manager'){
                spaceUser.spaceManager = true;
              }
              if (userRole === 'space_auditor'){
                spaceUser.spaceAuditor = true;
              }
            });
            $scope.deleteSpaceUserRoles(spaceUser).then(function(){
              deferred.resolve('Space User');
            });
          }else{
            if (!userIsInSpace) deferred.resolve('No Space User');
          }
        });

      }, function(err) {
        $log.error(err);
        messageService.addMessage('danger', 'The user has not been removed from organization.');
      });
      promises.push(deferred.promise);
    });

    return $q.all(promises);

  };


  $scope.deleteSpaceUserRoles = function (spaceUser) {
    var promises = [];

    if (spaceUser.spaceManager){
      promises.push(spaceService.disassociateManagerWithSpace(spaceUser));
    }
    if (spaceUser.spaceAuditor){
      promises.push(spaceService.disassociateAuditorWithSpace(spaceUser));
    }
    if (spaceUser.spaceDeveloper){
      promises.push(spaceService.disassociateDeveloperWithSpace(spaceUser));
    }

    return $q.all(promises);
  };

  $scope.deleteOrganizationUserRoles = function (organizationUser) {

    var promises = [];

    if (organizationUser.orgManager){
      promises.push(organizationService.disassociateManagerWithOrganization(organizationUser));
    }
    if (organizationUser.orgAuditor){
      promises.push(organizationService.disassociateAuditorWithOrganization(organizationUser));
    }
    if (organizationUser.billingManager){
      promises.push(organizationService.disassociateBillingManagerWithOrganization(organizationUser));
    }

    return $q.all(promises);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);