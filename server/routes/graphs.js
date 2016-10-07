var router = require('express').Router();
var mongoose = require('mongoose');
var db = require('../db');
var Graph = db.models.Graph;
var randomDate = require('randomDate');
var dateUtils = require('date-utils');
var numPoints = 12;
var numSeries = 3;

router.get('/', function(req, res, next){
	Graph.find({})
		.then(function(graphs){
			res.send(graphs);
		})
		.then(null, next);
});

router.get('/:id', function(req, res, next){
	Graph.findOne({_id: req.params.id})
		.then(function(graph){
			res.send(graph);
		})
		.then(null, next);
});


router.post('/', function(req, res, next){
	var startDate = randomDate(new Date(2015,01,01), new Date(2016,10,05));
	var dataArr = getDataSeries(Number(req.body.min), Number(req.body.max),startDate);

	var newGraph = new Graph({
		title: req.body.title,
		min: req.body.min,
		max: req.body.max,
		chartType: req.body.type,
		dataSeries: dataArr
	});

	newGraph.save()
		.then(function(response){
			res.send(response);
		}, next);
});

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getDataSeries(min, max, startDate){
	var arr = [];

	for (var i=0; i<numSeries; i++) {
		arr.push({
			data: getOneSeries(min, max, startDate),
		});
	}
	return arr;
};

function getOneSeries(min, max, startDate){
	var arr = [];
	var date = startDate;
	for (var i=0; i<numPoints; i++){
		var currDate = date.add({"days": 1}).toYMD('-');
		arr.push([currDate, randomIntFromInterval(min,max)]);
	}
	return arr;
};

module.exports = router;