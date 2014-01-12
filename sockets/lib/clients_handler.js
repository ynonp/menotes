var clients = [];

exports.add_client = function(client) {
  clients.push(client);
};

exports.remove_client = function(client) {
  var idx = clients.indexOf(client);

  if ( idx > -1 ) {
    console.log('-- removing client: ' + idx);
    clients.splice(idx, 1);
  } else {
    console.log('--- remove client called but client not found');
  }
};

exports.forEach = function(handler) {
  clients.forEach(handler);
};


