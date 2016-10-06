var router = require('express').Router();
var mongoose = require('mongoose');
var db = require('../db');
var Graph = db.models.Graph;
var randomDate = require('randomDate');
var dateUtils = require('date-utils');
var numPoints = 5;

router.get('/', function(req, res, next){
	Graph.find({})
		.then(function(graphs){
			console.log("get all graphs: ", graphs);
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
	console.log("inside router post: ", req.body);
	var startDate = randomDate(new Date(2015,01,01), new Date(2016,10,05));
	console.log("startDate: ", startDate);
	var dataArr = getDataSeries(Number(req.body.min), Number(req.body.max),startDate);
	console.log("data series: ", dataArr);

	var newGraph = new Graph({
		title: req.body.title,
		min: req.body.min,
		max: req.body.max,
		chartType: req.body.type,
		dataSeries: dataArr
	});

	newGraph.save()
		.then(function(response){
			console.log("response from save: ", response);
			res.send(response);
		}, next);

});

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getDataSeries(min, max, startDate) 
{
	var arr = [];
	var date = startDate;
	for (var i=0; i<numPoints; i++){
		var currDate = date.add({"days": 1}).toYMD('-');
		console.log("curr date: ", date);
		arr.push([currDate, randomIntFromInterval(min,max)]);
	}
	return arr;
}


module.exports = router;