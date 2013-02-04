define([
  // Standard Libs
  'lib/jquery/jquery-min.js'
  , 'lib/jstree/jquery.jstree.js'
  , 'lib/angular/angular.js'
  , 'lib/angular/angular-resource.js'
  , 'lib/angular/angular-loader.js'
  , 'lib/underscore/underscore.js'

  ], function () {
    var app = angular.module('jsTreeApp', ['ngResource']);

    app.factory('Data', function($resource) {

      return $resource('/data/treeData.json', {}, {
        getTreeData: { method: 'GET', isArray: false }
      });
    });

    app.controller('TestCtrl', ['$scope', 'Data', function ($scope, Data) {
      $scope.treeData = Data.getTreeData();
    }]);

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
          scope.$watch('jstree', function() {
            console.log(scope)
            $(element).jstree({
              "json_data" : scope.jstree,
              "plugins" : [ "themes", "json_data" ]
            }, false); //false -> don't do dirty deep checking (expensive)
          });
        }

      };
    });

    function initialize() {
      //initialize services
      console.log(angular);
      _.extend(angular.module, {jsTreeApp: app});

      //add controllers to angular.scope
    }

  return {
    initialize: initialize
  };

});