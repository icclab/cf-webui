angular.module('app.organization').controller('OrganizationAssociateUserCtrl', ['$q', '$route', '$routeParams', '$scope', '$modalInstance', '$log', 'spaces', 'organizationService', 'spaceService', 'messageService', function($q, $route, $routeParams, $scope, $modalInstance, $log, spaces, organizationService, spaceService, messageService) {

  $scope.spaces = spaces;
  $scope.spacesLength = spaces.length > 0;

  $scope.user = {
    name: '',
    orgManager: false,
    orgAuditor: false,
    billingManager: false,
    spaceManager: false,
    spaceAuditor: false,
    spaceDeveloper: false,
    spaceId: '',
    organizationId: $routeParams.organizationId
  };
  $scope.spacesRoles = [];

  angular.forEach($scope.spaces, function(space, key) {    
    var objectSpaceRoles = {
      spaceName: space.name,
      spaceId: space.id,
      spaceManager: false,
      spaceAuditor: false,
      spaceDeveloper: false,
    };
    $scope.spacesRoles.push(objectSpaceRoles);
  });

  $scope.ok = function () {
    messageService.removeAllMessages();
      organizationService.associateUserWithOrganization($scope.user).then(function(response) {
        var promises = [];
        promises.push($scope.addOrganizationUser($scope.user));
        promises.push($scope.addSpacesUser($scope.spacesRoles));
        $q.all(promises).then(function(){
          messageService.addMessage('success', 'The user been succesfully added. ');
          $modalInstance.close();
        }, function(err){
          messageService.addMessage('danger', 'The user has not been added. ' + err.data.description);
          $modalInstance.dismiss();
          $log.error(err);
        });

      }, function(err) {

        messageService.addMessage('danger', 'The user has not been added. ' + err.data.description);
        $modalInstance.close();
        $log.error(err);
      });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.addSpacesUser = function (spacesUser){
    var promises = [];
    angular.forEach(spacesUser, function(spaceUser, key){
      spaceUser.name = $scope.user.name;
      if (spaceUser.spaceManager) promises.push(spaceService.associateManagerWithSpace(spaceUser));
      if (spaceUser.spaceAuditor) promises.push(spaceService.associateAuditorWithSpace(spaceUser));
      if (spaceUser.spaceDeveloper) promises.push(spaceService.associateDeveloperWithSpace(spaceUser));
    });
    return $q.all(promises);
  };
  $scope.addOrganizationUser = function (organizationUser){
    var promises = [];
    if (organizationUser.orgManager) promises.push(organizationService.associateManagerWithOrganization(organizationUser));
    if (organizationUser.orgAuditor) promises.push(organizationService.associateAuditorWithOrganization(organizationUser));
    if (organizationUser.billingManager) promises.push(organizationService.associateBillingManagerWithOrganization(organizationUser));
    return $q.all(promises);
  };

}]);