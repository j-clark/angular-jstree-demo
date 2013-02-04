"use strict";

require.config({
	paths: {
		jQuery: '../lib/jquery/jquery-min'//'http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min'
		, Underscore: '../lib/underscore/underscore'
		, Angular: '../lib/angular/angular'
		, jsTree: '../lib/jstree/jquery.jstree'
	}
	, priority: [ 
		"jQuery"
		, "Underscore"
		, "Angular" 
	]
});

require([
	// Standard Libs
	'require'
	, 'jQuery'
	, 'Underscore'
	, 'Angular'
], function (require, $, _, angular) {
	console.log('asdf')
	require(['app'], function (App) {
		App.initialize();
	});
});