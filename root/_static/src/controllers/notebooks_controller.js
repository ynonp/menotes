myapp.controller('NotebooksList', ['$scope', 'Notebooks', function($scope, Notebooks) {

  $scope.list = Notebooks.all();

  $scope.add_notebook = function(name) {
    Notebooks.add(name);
  };

}]);