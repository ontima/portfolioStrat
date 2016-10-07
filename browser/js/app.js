var app = angular.module('portfolioStrat', ['ui.router', 'highcharts-ng', 'ngToast']);

app.config(function ($urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
});