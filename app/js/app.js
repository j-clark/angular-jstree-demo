'use strict';

/* App Module */
var app = angular.module('jsTreeApp', ['ngResource']);

var TestCtrl = function($scope, Data) {
  $scope.treeData = Data.getTreeData();
}

app.directive('jstree', function() {
  return function(scope, element) {
    scope.$watch('treeData.data', function() {
      $(element).jstree({
        "json_data" : scope.treeData,
        "plugins" : [ "themes", "json_data" ]
      });
    })
  }
});

app.factory('Data', function($resource) {
  return $resource('/data/treeData.json', {}, {
    getTreeData: { method: 'GET', isArray: false }
  })
})