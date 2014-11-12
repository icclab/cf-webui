var logIn = angular.module('logIn', []);

logIn.controller('LogInCtrl', ['$scope', '$location', 'authService', function($scope, $location, authService) {
  $scope.logInData = {
    userName: '',
    password: ''
  };

  $scope.message = '';

  $scope.logIn = function() {
    authService.logIn($scope.logInData).then(function(response) {
      $location.path('/');
    },
    function (err) {
      $scope.message = err.error_description;
    });
  };

  $scope.logOut = function() {
    authService.logOut();
    $location.path('/login');
  }
}]);
