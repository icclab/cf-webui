var login = angular.module('login', []);

login.controller('LoginCtrl', ['$scope', 'loginService', function($scope, loginService) {
  $scope.login = function(user) {
    loginService.login(user);
  };

  $scope.logout = function() {
    loginService.logout();
  }
}]);
