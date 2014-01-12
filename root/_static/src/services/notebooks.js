myapp.factory('Notebooks', ['$http', function($http) {

  var _notebooks = [ ];

  return {
    all: function() {
      $http.get('/notebooks')
        .success(function(res, status) {
          // replace all _notebooks with res.data
          _notebooks = res.data;

          [].splice.apply(_notebooks, [0,_notebooks.length].concat(res.data));
        })
        .error(function(res, status) {
          console.log(res);
          console.log(status);
        });

      return _notebooks;
    },

    add: function(name) {
      var id = Math.floor(Math.random() * 999999999);

      _notebooks.push({ name: name, id: id});
    }
  };
}]);















