(function(global) {


  global.myapp.directive('myDialog', ['$rootScope', function($rootScope) {
    return {
      scope: {
        dlgOk: '&',
        dlgId: '@',
        dlgTitle: '@'
      },
      restrict: "E",

      templateUrl: 'src/directives/my_dialog.html',
      transclude: true
    };
  }]);

  global.myapp.directive('dlgText', ['$rootScope', function($rootScope) {
    return {
      scope: {
        'ngModel' : '='
      },
      restrict: "E",
      template:
        '<div class="form-group">' +
          '<label for="note-title">Title</label>' +
          '<input type="text" ng-model="ngModel" class="form-control" id="note-title" placeholder="Enter name...">' +
        '</div>'
    };
  }]);

  global.myapp.directive('dlgTextarea', ['$rootScope', function($rootScope) {
    return {
      scope: {
        'ngModel' : '='
      },
      restrict: "E",
      template:
        '<div class="form-group">' +
          '<label for="note-title">Text</label>' +
          '<textarea class="form-control" ng-model="ngModel" placeholder="Type some text..."></textarea> ' +
          '</div>'
    };
  }]);


}(this));
