var login = angular.module('login', []);

login.controller('LoginCtrl', ['$scope', 'loginService', function($scope, loginService) {
  $scope.login = function(data) {
    loginService.login(data);
  };
}]);
