angular.module('app.message').controller('MessagesCtrl', ['$rootScope', '$scope', 'messageService', function($rootScope, $scope,messageService) {
  $scope.messages = messageService.messages;
  
  messageService.removeAllMessages();

  $scope.closeMessage = function(index) {
    $scope.messages.splice(index, 1);
  };
}]);