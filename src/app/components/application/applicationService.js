angular.module('app.application').factory('applicationService', ['$q', '$http', function($q, $http) {
  var applicationServiceFactory = {};
  
  var _getApplications = function() {
    
    var url = '/v2/apps';

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.get(url, config);
  };
  
  var _getApplicationSummary = function(id) {
    
    var url = '/v2/apps/' + id + '/summary';

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.get(url, config);
  };
  
  var _getStack = function(id) {
    
    var url = '/v2/stacks/' + id;

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.get(url, config);
  };
  
  var _getInstances = function(id) {
    
    var url = '/v2/apps/' + id + '/stats';

    // params
    var params = {
      'guid' : id
    };

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers,
    };

    return $http.get(url, config);
  };
  
  var _getAppEvents = function(id) {
    
    var url = '/v2/events?order-direction=desc&q=actee:' + id + '&results-per-page=5';

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.get(url, config);
  };
  
  var _getEnvironmentVariables = function(id) {
    
    var url = '/v2/apps/' + id + '/env';

    // http headers
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var config = {
      headers: headers
    };

    return $http.get(url, config);
  };
  
  var _getServiceBindings = function(id) {
    
    // params
    var url = '/v2/apps/' + id + '/service_bindings';
    var params = {
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

    return $http.get(url, config);
  };

  var _createApplication = function(application) {
    
    var url = '/v2/apps';

    // data
    var data = {
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

    return $http.post(url, data, config);
  };

  var _addApplication = function(app) {
    var promises = [];
    var resources = [];

    for ( var i = 0; i < app.bits.length; i++) {
      var fd = new FormData();
      var url = '/v2/apps/' + app.id +'/bits';

      // data
      /*var data = {
        'url': '/v2/apps/' + application.id +'/bits',
        'resources': resources,
        'application': fd
      };*/
      var application = app.bits[i];

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
    
    var url = '/v2/apps/' + application.id;

    // data
    var data = {
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

    return $http.put(url, data, config);
  };
  
  var _deleteApplication = function(applicationId) {
    
    var url = '/v2/apps/' + applicationId;

    // data
    var data = {
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
    
    return $http.delete(url, config);
  };
  
  // environment variables
  var _editApplicationEnv = function(applicationId, userEnvs) {
    
    var url = '/v2/apps/' + applicationId;

    // data
    var data = {
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

    return $http.put(url, data, config);
  };
  
  var _stopApplication = function(applicationId) {
    
    var url = '/v2/apps/' + applicationId;

    // data
    var data = {
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

    return $http.put(url, data, config);
  };
  
  var _startApplication = function(applicationId) {
    
    var url = '/v2/apps/' + applicationId;

    // data
    var data = {
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

    return $http.put(url, data, config);
  };
  
  var _scaleApplication = function(applicationId, scale) {
    
    var url = '/v2/apps/' + applicationId;

    // data
    var data = {
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

    return $http.put(url, data, config);
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