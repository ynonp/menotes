(function(global) {

  global.myapp.controller('NotebooksList', ['$scope', 'Notebooks', function($scope, Notebooks) {

    $scope.list = Notebooks.fetch();

  }]);

}(this));