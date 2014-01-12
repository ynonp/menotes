(function(global) {


  global.myapp.controller('NotesList', ['$scope', 'Notebooks', '$routeParams', function($scope, Notebooks, $routeParams) {
    var _notebook_id = $routeParams['nid'];
    $scope.dlg = { title: '', text: '' };

    if ( _notebook_id ) {
      $scope.list = Notebooks.fetch_notes(_notebook_id);
    }

    $scope.delete_note = function(idx) {
      var note = $scope.list[idx];
      Notebooks.delete_note(_notebook_id, note.id);
      // $scope.list.splice(idx, 1);
    };

    $scope.$on('note.end_add', function(event, notebook_id) {
      console.dir(arguments);

      if ( ! notebook_id || _notebook_id != notebook_id) {
        return;
      }

      $scope.list = Notebooks.fetch_notes(notebook_id);
    });

    $scope.$on('note.add', function(event,data) {
      $scope.list.push(data.note);
      $scope.$apply();
    });

    $scope.$on('note.delete', function(event,data) {
      $scope.list = $scope.list.filter(function(item) {
        return item.id != data.id
      });

      $scope.$apply();
    });
  }]);

}(this));

















