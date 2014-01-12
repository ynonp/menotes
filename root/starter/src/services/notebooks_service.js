(function(global) {
  var local_notebooks = [
    { name: 'projects', id: 0, notes: [ { title: 'hello', text: 'just a test note'}]},
    { name: 'home', id: 1, notes: [ { title: 'home note', text: 'just a test note'}]},
    { name: 'local', id: 2, notes: [ { title: 'another note', text: 'just a test note'}]}
  ];


  global.myapp.factory('Notebooks', ['$http', '$rootScope', function($http, $rootScope) {
    var _notebooks = [];

    return {
      fetch: function() {
        return local_notebooks;
      },

      fetch_notes: function(notebook_id) {
        return local_notebooks[notebook_id].notes;
      }
    }
  } ]);

  global.myapp.factory('Notebooks_SERVER', ['$http', '$rootScope', function($http, $rootScope) {
    var _notebooks = [];

    return {
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
      }
    }
  } ]);

}(this));