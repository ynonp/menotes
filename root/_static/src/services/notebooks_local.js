myapp.factory('Notebooks', ['$http', function($http) {

  var _notebooks = [
    { name: 'joe', id: 0 },
    { name: 'bob', id: 1 }
  ];

  var obj = {
    all: function() {
      return _notebooks;
    },

    add: function(name) {
      var id = Math.floor(Math.random() * 999999999);

      _notebooks.push({ name: name, id: id});
    }
  };
  return obj;
}]);
