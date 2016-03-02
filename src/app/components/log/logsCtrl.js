angular.module('app.log', ['ngCookies']).controller('LogsCtrl', ['$rootScope', '$scope', '$websocket', '$cookies', '$routeParams', '$modal', '$log', function($rootScope, $scope, $websocket, $cookies, $routeParams, $modal, $log) {
  $rootScope.rootFields.showContent = false;
  
  var accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);
  $cookies.put('user_session', accessToken);

  var ws = $websocket('wss://loggregator.run.pivotal.io:443/tail/?app=' + $routeParams.applicationId);

  $scope.collection = [];

  ws.onMessage(function(message) {
    //console.log('Nuevo mensaje: ' + test);
    //console.log(message);

    //collection.push(JSON.parse(message));
    //$rootScope.collection.push(message);
    var myReader = new FileReader();

    myReader.addEventListener("loadend", function(e){
        //console.log(JSON.stringify(e.target.result));
        data = e.target.result.slice(-7).replace(/[^\w\.@\->{}()=,"]/g, " ");
        var type = data.slice(-4).replace(" ", "");
        var color = data.slice(-7,-4).replace(" ", "");
        var first = e.target.result.search(/(([A-Z][a-z])|(\-{2,})|[a-z][a-z]|├|└|\s{3,})[\s\S]*/g);
       //var datos = e.target.result.slice(first).replace(/[^\w\.@\->{}()=,"\s]{3}[\s\S]+/g, "").replace(/[^\w\.@\->{}()=,"]/g, " ");
        var logMessage = e.target.result.slice(first).replace(/[^\w\.@\->{}()=,"├└:/!\s]{3}[\s\S]+/g, "").replace(/[^\w\.@\->{}()=├└─:\/!,"]/g, " ");

        var date = new Date(message.timeStamp/1000);
        var logData = {
          date: date.toDateString() + ' ' + date.toTimeString(),
          type: type,
          message: logMessage
        };
        console.log(logData.message);
        $scope.collection.push(logData);
        $rootScope.$apply();
    });

    myReader.readAsText(message.data, 'UTF-8');
  });

  ws.onError(function(event) {
    console.log('connection Error', event);
  });

  ws.onClose(function(event) {
    console.log('connection closed', event);
  });

  ws.onOpen(function() {
    console.log('connection open');
  });

  
  $scope.$on('$routeChangeStart', function(next, current) { 

    ws.close();

  });

}]);