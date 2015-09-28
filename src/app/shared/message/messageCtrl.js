angular.module('app.message').controller('MessagesCtrl', ['$rootScope', '$scope', 'messageService', function($rootScope, $scope,messageService) {
  $scope.messages = messageService.messages;

    $scope.closeAllMessages = function(index) {

    if ($rootScope.rootFields.waitDelete===false && $scope.messages.length > 0){
      $scope.messages.length = 0;
    }
    $rootScope.rootFields.waitDelete=false;
  };
  $scope.closeAllMessages();

  $scope.closeMessage = function(index) {
    $scope.messages.splice(index, 1);
  };
}]);