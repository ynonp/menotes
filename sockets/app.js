var amqp = require('amqp');

var connection = amqp.createConnection({ host: 'localhost', login: 'guest', password: 'guest' });

var clientId = 0;
var clients = [];

var socket_handler = require('./lib/socket_sse.js');

connection.on('ready', function () {
  // Use the default 'amq.topic' exchange
  connection.queue('events', function(q){
    // Catch all messages
    q.bind('#');

    // Receive messages
    q.subscribe(function (message) {

      // Do something with incoming message
      console.log('--- new message: ');
      socket_handler.send_to_all(message.data.toString());
    });
  });
});




