'use strict';

/* App Module */
var app = angular.module('jsTreeApp', ['ngResource']);

var TestCtrl = function($scope, Data) {
  $scope.treeData = Data.getTreeData();
}

app.directive('jstree', function() {
  return {

    //jstree must be an attribute on an HTML element
    restrict: 'A',

    //give every [jstree] its own scope
    scope: {
      //create a two-way binding between this scope and the attribute's value
      jstree: '='
    },

    //call this function to construct the element
    link: function(scope, element, attrs) {
      //when scope.jstree.data changes, call this function
      scope.$watch('jstree.data', function() {
        $(element).jstree({
          "json_data" : scope.jstree,
          "plugins" : [ "themes", "json_data" ]
        }, false); //false -> don't do dirty deep checking (expensive)
      });
    }

  };
});

app.factory('Data', function($resource) {
  return $resource('/data/treeData.json', {}, {
    getTreeData: { method: 'GET', isArray: false }
  })
})