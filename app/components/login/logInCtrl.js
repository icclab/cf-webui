angular.module('app.logIn').controller('LogInCtrl', ['$scope', '$location', 'authService', 'messageService', function($scope, $location, authService, messageService) {
  $scope.logInData = {
    userName: '',
    password: ''
  };

  $scope.logIn = function() {
    authService.logIn($scope.logInData).then(function(response) {
      $location.path('/');
    },
    function (err) {
      messageService.addMessage('danger', err.error_description);
    });
  };

  $scope.logOut = function() {
    authService.logOut();
    $location.path('/login');
  };
}]);