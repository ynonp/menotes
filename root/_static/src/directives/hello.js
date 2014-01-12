myapp.directive('texter', [function() {
  return {
    scope: {
      'title': '@myText',
      'go' : '&myAction'
    },
    restrict: 'EA',
    templateUrl: 'src/directives/hello.html'
  }
}]);

myapp.directive('myModel', [function() {
  return {
    scope: {
      'model' : '=myModel'
    },
    link: function($scope, $element, $attrs) {
      $element.on('input', function() {
        $scope.model = this.value;
        $scope.$apply();
      });
    }
  };
}]);



















