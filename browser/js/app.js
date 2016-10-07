var app = angular.module('portfolioStrat', ["ui.router", "highcharts-ng"]);

app.config(function ($urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
});