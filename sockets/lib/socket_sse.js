var express = require('express');
var app = express();
var clients = require('./clients_handler.js');

// Called once for each new client. Note, this response is left open!
app.get('/events', function(req, res) {
  req.socket.setTimeout(Infinity);
  res.writeHead(200, {
    'Content-Type': 'text/event-stream', // <- Important headers
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin' : '*',
  });
  res.write('\n');
  console.log('New client connected');

  clients.add_client(res);

  req.on('close', function() {
    clients.remove_client(res);
  });
});

exports.send_to_all = function(msg) {
  clients.forEach(function(c) {
    c.write("data: " + msg + "\n\n");
  });
}


app.listen(process.env.PORT || 8080);





