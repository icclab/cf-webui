app.factory('loginService', ['$http', '$location', function($http, $location) {
  return {
    login: function(user) {
      $http({
        method: 'POST',
        url: '/request.php',
        data: {
          'url': 'https://uaa.run.pivotal.io/oauth/token',
          'grant_type': 'password',
          'password': user.password,
          'username': user.email,
          'scope': ''
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic Y2Y6',
        }
      }).success(function(data, status, headers, config) {
        if (data.access_token != null) {
          sessionStorage.setItem('access_token', data.access_token);
          sessionStorage.setItem('refresh_token', data.refresh_token);
          sessionStorage.setItem('logged_in', true);

          $location.path('/dashboard');
        } else {
          console.log('login failed');
        }
      }).error(function(data, status, headers, config) {
        console.log(data);
      });
    },

    logout: function() {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('logged_in');

      $location.path('/login');
    }
  };
}]);