angular.module('app.message').controller('MessagesCtrl', ['$rootScope', '$scope', 'messageService', function($rootScope, $scope,messageService) {
  $scope.messages = messageService.messages;

    $scope.closeAllMessages = function(index) {
    console.log('¿Borrar mensajes? (MessagesCtrl 1)');
    console.log($rootScope.rootFields.waitDelete);

    if ($rootScope.rootFields.waitDelete===false && $scope.messages.length > 0){
      $scope.messages.length = 0;
      console.log('Borro mensaje');
    }
    $rootScope.rootFields.waitDelete=false;
    console.log('¿Borrar mensajes? (MessagesCtrl 2)');
    console.log($rootScope.rootFields.waitDelete);
  };
  $scope.closeAllMessages();

  $scope.closeMessage = function(index) {
    $scope.messages.splice(index, 1);
  };
}]);