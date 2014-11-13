angular.module('app.message').factory('messageService', [function() {
  var messageServiceFactory = {};

  var _messages = [];

  var _addMessage = function(type, msg) {
    var message = {
      type: type,
      msg: msg
    };

    _messages.push(message);
  };

  var _removeMessage = function(messageObject) {
    var index = _messages.indexOf(messageObject);
    _messages.splice(index, 1);
  };

  messageServiceFactory.messages = _messages;
  messageServiceFactory.addMessage = _addMessage;
  messageServiceFactory.removeMessage = _removeMessage;

  return messageServiceFactory;
}]);