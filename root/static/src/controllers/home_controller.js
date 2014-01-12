(function(global) {

  global.myapp.controller('Home', ['$scope', '$routeParams', 'Notebooks', function($scope, $routeParams, Notebooks) {

    $scope.active_notebook = $routeParams.nid;


    $scope.dlg = { title: '', text: '', notebook_name: '' };

    $scope.add_note = function(notebook_id, title, text) {
      Notebooks.add_note(notebook_id, title,text);
    };

    $scope.add_notebook = function(name) {
      Notebooks.add_notebook(name);
    };


  }]);


}(this));