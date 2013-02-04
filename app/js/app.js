define([
  // Standard Libs
  'lib/jquery/jquery-min.js'
  , 'lib/angular/angular.js'
  , 'lib/angular/angular-resource.js'
  , 'lib/angular/angular-loader.js'
  , 'lib/underscore/underscore.js'

], function () {
  //'use strict';

  /* App Module */
  console.log('jQuery: ' + jQuery)
  var app = angular.module('jsTreeApp', ['ngResource']);

  function TestCtrl($scope, Data) {
    $scope.treeData = Data.getTreeData();
  };

  var jstreeModule = function() {
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
  };

  var registeredDirectives = {
    jstree: jstreeModule
  };

  var service = function ($resource) {

    return $resource('/data/treeData.json', {}, {
      getTreeData: { method: 'GET', isArray: false }
    });

  };
  service.$inject = ['$resource'];

  var registeredServices = {
    Data: service
  };  


  var registeredControllers = {
    TestCtrl: TestCtrl
  };
  TestCtrl.$inject = ['$scope'];

  // app.factory('Data', function($resource) {
  //   return $resource('/data/treeData.json', {}, {
  //     getTreeData: { method: 'GET', isArray: false }
  //   })
  // });

  function initialize() {
    //initialize services
    console.log('angular.service: ', angular.service)
    _.extend(angular.service, registeredServices);
    _.extend(angular.module, {jsTreeApp: app});
    _.extend(angular.directive, registeredDirectives);

    //add controllers to angular.scope
    var scope = angular.scope();
    _.extend(scope, {jsTreeApp: app});
    _.extend(scope, registeredControllers);


    //add scope to window    
    angular.compile(window.document)(scope);
  }

  return {
    initialize: initialize
  };
});