angular.module('app.space').controller('SpaceAddCtrl', ['$route', '$scope', '$modalInstance', '$log', 'space', 'spaceService', 'messageService', function($route, $scope, $modalInstance, $log, space, spaceService, messageService) {

  $scope.space = {
    organizationId: space.organizationId
  };

  $scope.ok = function () {
    messageService.removeAllMessages();
    spaceService.addSpace($scope.space).then(function(response) {
      // close the modal
      space.name = $scope.space.name;
      $scope.addUser(response.data.metadata.guid);
      // set message
      messageService.addMessage('success', 'The space has been successfully added.',true);
    }, function(err) {
      // set message
      messageService.addMessage('danger', 'The space has not been added.');
      $log.error(err);

      // close the modal
      $modalInstance.close();
    });
  };

  $scope.addUser = function (spaceId) {
    var currentUser = {
      name: localStorage.getItem('userName'),
      spaceId: spaceId
    };
    spaceService.associateManagerWithSpace(currentUser).then(function(response) {
      spaceService.associateAuditorWithSpace(currentUser).then(function(response) {
        spaceService.associateDeveloperWithSpace(currentUser).then(function(response) {
          $modalInstance.close();
        }, function(err) {
          messageService.addMessage('danger', 'The space developer has not been added.');
          $modalInstance.close();
          $log.error(err);
        });
      }, function(err) {
        messageService.addMessage('danger', 'The space auditor has not been added.');
        $modalInstance.close();
        $log.error(err);
      });
    }, function(err) {
      messageService.addMessage('danger', 'The space manager has not been added.');
      $modalInstance.close();
      $log.error(err);
    });

  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);