(function(global) {

  global.myapp.controller('NotesList', ['$scope', 'Notebooks', function($scope, Notebooks) {
    $scope.list = Notebooks.fetch_notes(1);
  }]);

}(this));