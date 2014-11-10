app.factory('loginService', ['$http', function($http) {
  return {
    login: function(data) {
      $http({
        method: 'POST',
        url: '/request.php',
        data: {
          'url': 'https://uaa.run.pivotal.io/oauth/token',
          'grant_type': 'password',
          'password': data.password,
          'username': data.email,
          'scope': ''
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic Y2Y6',
        }
      }).success(function(data, status, headers, config) {
        console.log(data);
      }).error(function(data, status, headers, config) {
        console.log(data);
      });
    }
  };
}]);