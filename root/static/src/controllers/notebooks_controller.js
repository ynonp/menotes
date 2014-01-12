(function(global) {

  global.myapp.controller('NotebooksList', ['$scope', 'Notebooks','$rootScope', function($scope, Notebooks, $rootScope) {
    $scope.busy = false;
    $scope.list = Notebooks.fetch();

    $rootScope.$on('notebook.start_add', function() {
      $scope.busy = true;
    });

    $rootScope.$on('notebook.end_add', function() {
      $scope.busy = false;
    });

  }]);

}(this));