var space = angular.module('space', []);

space.controller('SpaceEditCtrl', ['$scope', '$modalInstance', 'space', 'spaceService', function($scope, $modalInstance, space, spaceService) {

  $scope.space = space;

  $scope.ok = function () {
    spaceService.editSpace($scope.space).then(function(response) {
      console.log('space changed 2');
    }, function(err) {
      console.log('error 2: ' + err);
    });

    $modalInstance.close($scope.space);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);