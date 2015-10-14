angular.module('app.logIn').controller('LogInCtrl', ['$scope', '$location', '$route', '$log', 'authService', 'messageService', function($scope, $location, $route, $log, authService, messageService) {
  $scope.logInData = {
    userName: '',
    password: ''
  };
  //authService.logOut();

  $scope.logIn = function() {
    authService.logOut();
    messageService.removeAllMessages();
    authService.logIn($scope.logInData).then(function(response) {
      $location.path('/');
    },
    function (err) {
      messageService.addMessage('danger', err.error_description);
      $log.error(err);
    });
  };

  $scope.logOut = function() {
    messageService.removeAllMessages();
    authService.logOut();
    console.log(messageService.messages);
    console.log('holis');
    messageService.addMessage('danger', 'Logged out successfully');
    console.log(messageService.messages);
    $location.path('/login');

    

  };
}]);