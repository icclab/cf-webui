angular.module('app.message').controller('MessagesCtrl', ['$scope', 'messageService', function($scope,messageService) {
  $scope.messages = messageService.messages;

  $scope.closeMessage = function(index) {
    $scope.messages.splice(index, 1);
  };
}]);