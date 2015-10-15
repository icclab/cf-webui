angular.module('app.organization').controller('OrganizationAssociateUserCtrl', ['$route', '$routeParams', '$scope', '$modalInstance', '$log', 'spaces', 'organizationService', 'spaceService', 'messageService', function($route, $routeParams, $scope, $modalInstance, $log, spaces, organizationService, spaceService, messageService) {

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
    console.log(space);
    var objectSpaceRoles = {
      spaceName: space.name,
      spaceId: space.id,
      spaceManager: false,
      spaceAuditor: false,
      spaceDeveloper: false,
    };

    $scope.spacesRoles.push(objectSpaceRoles);

  });
  console.log($scope.spacesRoles);

  $scope.ok = function () {
    messageService.removeAllMessages();
    organizationService.associateUserWithOrganization($scope.user).then(function(response) {
      // set message
      messageService.addMessage('success', 'The user has been successfully added.');
      if ($scope.user.orgManager){
        organizationService.associateManagerWithOrganization($scope.user).then(function(response) {
          // set message
          messageService.addMessage('success', 'The organization manager has been successfully added.');
          // close the modal
          $modalInstance.close();
        }, function(err) {
          // set message
          messageService.addMessage('danger', 'The organization manager has not been added.');
          $log.error(err);
          $modalInstance.close();
        });
      }

      if ($scope.user.orgAuditor){
        organizationService.associateAuditorWithOrganization($scope.user).then(function(response) {
          // set message
          messageService.addMessage('success', 'The organization auditor has been successfully added.');
          $modalInstance.close();
        }, function(err) {
          // set message
          messageService.addMessage('danger', 'The organization auditor has not been added.');
          $log.error(err);
          $modalInstance.close();
        });
      }

      if ($scope.user.billingManager){
        organizationService.associateBillingManagerWithOrganization($scope.user).then(function(response) {
          // set message
          messageService.addMessage('success', 'The organization billing manager has been successfully added.');
          $modalInstance.close();
        }, function(err) {
          // set message
          messageService.addMessage('danger', 'The organization billing manager has not been added.');
          $log.error(err);
          $modalInstance.close();
        });      
      }

      angular.forEach($scope.spacesRoles, function(spaceRoles, key) {  
        spaceRoles.name = $scope.user.name;  

        if (spaceRoles.spaceManager){
          spaceService.associateManagerWithSpace(spaceRoles).then(function(response) {
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

        if (spaceRoles.spaceAuditor){
          spaceService.associateAuditorWithSpace(spaceRoles).then(function(response) {
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

        if (spaceRoles.spaceDeveloper){
          spaceService.associateDeveloperWithSpace(spaceRoles).then(function(response) {
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

    }, function(err) {
      // set message
      messageService.addMessage('danger', 'The user has not been added.');
      $log.error(err);
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);