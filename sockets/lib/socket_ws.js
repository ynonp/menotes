var clients = require('./clients_handler.js');

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080});

wss.on('headers', function(headers) {
  headers.push('Access-Control-Allow-Origin: *');
});

wss.on('connection', function(ws) {
  console.log('new client connected');
  clients.add_client(ws);

  ws.on('close', function() {
    console.log('client lost');
    clients.remove_client(ws);
  });
});


exports.send_to_all = function(msg) {

  clients.forEach(function(c) {
    c.send(msg);
  });

};


