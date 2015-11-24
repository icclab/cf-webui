angular.module('app.application').factory('applicationService', ['$q', '$http', 'API_ENDPOINT', function($q, $http, API_ENDPOINT) {
  var applicationServiceFactory = {};
  
  var _getApplications = function() {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/apps'
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      params: params,
      headers: headers
    };

    return $http.get('/request.php', config);
  };
  
  var _getApplicationSummary = function(id) {
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/apps/' + id + '/summary'
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      params: params,
      headers: headers
    };

    return $http.get('/request.php', config);
  };
  
  var _getStack = function(id) {
    
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/stacks/' + id,
      'guid' : id
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      params: params
    };

    return $http.get('/request.php', config);
  };
  
  var _getInstances = function(id) {
    
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/apps/' + id + '/stats',
      'guid' : id
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      params: params
    };

    return $http.get('/request.php', config);
  };
  
  var _getAppEvents = function(id) {
    
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/events?order-direction=desc&q=actee:' + id + '&results-per-page=5'
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      params: params
    };

    return $http.get('/request.php', config);
  };
  
  var _getEnvironmentVariables = function(id) {
    
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/apps/' + id + '/env'
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      params: params
    };

    return $http.get('/request.php', config);
  };
  
  var _getServiceBindings = function(id) {
    
    // params
    var params = {
      'url': API_ENDPOINT + '/v2/apps/' + id + '/service_bindings',
      'inline-relations-depth': 1
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      params: params
    };

    return $http.get('/request.php', config);
  };

  var _createApplication = function(application) {
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/apps',
      'name': application.name,
      'space_guid': application.spaceId,
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.post('/request.php', data, config);
  };

  var _addApplication = function(app) {
    var promises = [];
    console.log(app);
    var resources = [];

    for ( var i = 0; i < app.bits.length; i++) {
      var fd = new FormData();
      var url = API_ENDPOINT + '/v2/apps/' + app.id +'/bits';

      // data
      /*var data = {
        'url': API_ENDPOINT + '/v2/apps/' + application.id +'/bits',
        'resources': resources,
        'application': fd
      };*/
      console.log(app.bits[i]);
      var application = app.bits[i];
      console.log(application);


      fd.append("url", url);
      fd.append("application", application);
      fd.append("resources", resources);

      // http headers
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data; boundary=AaB03x'
      };

      var config = {
        headers: headers,
      };

      promises.push($http.put('/request.php', fd, config));
    }

    return $q.all(promises);
    
  };
  
  var _editApplication = function(application) {
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/apps/' + application.id,
      'name': application.name
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.put('/request.php', data, config);
  };
  
  var _deleteApplication = function(applicationId) {
    
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/apps/' + applicationId,
      'guid' : applicationId
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
      data: data
    };
    
    return $http.delete('/request.php', config);
  };
  
  // environment variables
  var _editApplicationEnv = function(applicationId, userEnvs) {
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/apps/' + applicationId,
      'environment_json': userEnvs
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.put('/request.php', data, config);
  };
  
  var _stopApplication = function(applicationId) {
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/apps/' + applicationId,
      'state': 'STOPPED'
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.put('/request.php', data, config);
  };
  
  var _startApplication = function(applicationId) {
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/apps/' + applicationId,
      'state': 'STARTED'
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.put('/request.php', data, config);
  };
  
  var _scaleApplication = function(applicationId, scale) {
    // data
    var data = {
      'url': API_ENDPOINT + '/v2/apps/' + applicationId,
      'instances': scale.instances,
      'memory': scale.memory
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.put('/request.php', data, config);
  };
  
  applicationServiceFactory.getApplications = _getApplications;
  applicationServiceFactory.getApplicationSummary = _getApplicationSummary;
  applicationServiceFactory.getStack = _getStack;
  applicationServiceFactory.getInstances = _getInstances;
  applicationServiceFactory.getAppEvents = _getAppEvents;
  applicationServiceFactory.getEnvironmentVariables = _getEnvironmentVariables;
  applicationServiceFactory.getServiceBindings = _getServiceBindings;
  applicationServiceFactory.createApplication = _createApplication;
  applicationServiceFactory.addApplication = _addApplication;
  applicationServiceFactory.editApplication = _editApplication;
  applicationServiceFactory.editApplicationEnv = _editApplicationEnv;
  applicationServiceFactory.deleteApplication = _deleteApplication;
  applicationServiceFactory.stopApplication = _stopApplication;
  applicationServiceFactory.startApplication = _startApplication;
  applicationServiceFactory.scaleApplication = _scaleApplication;
  
  return applicationServiceFactory;
}]);