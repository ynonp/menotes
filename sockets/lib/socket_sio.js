var io = require('socket.io').listen(8080);

exports.send_to_all = function(msg) {
  io.sockets.emit('event', JSON.parse(msg));
};

