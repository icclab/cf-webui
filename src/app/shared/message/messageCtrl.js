angular.module('app.message').controller('MessagesCtrl', ['$rootScope', '$scope', '$location', 'messageService', function($rootScope, $scope, $location, messageService) {
  $scope.messages = messageService.messages;
  
  console.log($location.path());
  if($location.path() !== '/login') messageService.removeAllMessages();
  console.log(messageService.messages);
  console.log($rootScope.rootFields.showContent);

  $scope.closeMessage = function(index) {
    $scope.messages.splice(index, 1);
  };

}]);