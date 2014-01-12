(function(global) {



  var listen_to_socket_io = function(handler) {
    var socket = io.connect('http://localhost:8080');

    socket.on('event', function(data) {
      handler(data);
    });
  };

  var listen_to_sse = function(handler) {
    var source = new EventSource('http://localhost:8080/events');
    source.onmessage = function(e) {
      var data = JSON.parse(e.data);
      handler(data);
    };
  };

  var listen_to_websocket = function(handler) {
    var socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = function(msg) {
      var data = JSON.parse(msg.data);
      handler(data);
    };
  };


  global.myapp.factory('Notebooks', ['$http', '$rootScope', function($http, $rootScope) {
    var _notebooks = [];

    var handler = function(data) {
      $rootScope.$broadcast(data.scope + '.' + data.action, data);
    };

    // listen_to_socket_io(handler);
    listen_to_sse(handler);
    // listen_to_websocket(handler);

    return {
      add_notebook: function(name) {
        $rootScope.$broadcast('notebook.start_add');
        $http.post('/notebooks', { name: name })
          .success(function(res, status) {
            _notebooks.push(res.data);
            $rootScope.$broadcast('notebook.end_add');
          })
          .error(function(res, status) {
            $rootScope.$broadcast('notebook.end_add');
          });
      },

      add_note: function(notebook_id, note_title, note_text) {
        $rootScope.$broadcast('note.start_add');
        $http.post('/notebooks/' + notebook_id + '/notes', { title: note_title, text: note_text })
          .success(function(res, status) {
            console.log('note add ok');
            $rootScope.$broadcast('note.end_add', notebook_id);
          })
          .error(function(res, status) {
            $rootScope.$broadcast('note.end_add');
          });
      },

      fetch: function() {
        $http.get('/notebooks')
          .success(function(res, status) {
            Array.prototype.splice.apply(_notebooks,[0,_notebooks.length].concat(res.data));
          })
          .error(function(res, status) {
            console.log('Error: ' + res);
            console.dir(res);
            console.dir(status);
            $rootScope.$broadcast('error', res, status);
          });

        return _notebooks;
      },

      fetch_notes: function(notebook_id) {
        var notes = [];

        $http.get('/notebooks/' + notebook_id + '/notes')
          .success(function(res, status) {
            Array.prototype.splice.apply(notes,[0,notes.length].concat(res.data.notes));
          })
          .error(function(res, status) {
            $rootScope.$broadcast('error', res, status);
          });

        return notes;
      },

      delete_note: function(notebook_id, note_id) {
        $http({method: 'DELETE', url: '/notebooks/' + notebook_id + '/notes/' + note_id})
          .error(function() {
            alert('failed to delete note');
          });
      }
    }
  } ]);

}(this));
