var router = require('express').Router();
var mongoose = require('mongoose');
var db = require('../db');
var Graph = db.models.Graph;
var randomDate = require('randomDate');
var dateUtils = require('date-utils');
var numPoints = 5;

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getDataSeries(min, max, startDate) 
{
	var arr = [];
	for (var i=0; i<numPoints; i++){
		var date = startDate.add({"days": 1}).toYMD('-');
		console.log("curr date: ", date);
		arr.push([date, randomIntFromInterval(min,max)]);
	}
	return arr;
}

router.post('/', function(req, res, next){
	console.log("inside router post: ", req.body);
	var startDate = randomDate(new Date(2015,01,01), new Date(2016,10,05));
	console.log("startDate: ", startDate);
	var dataArr = getDataSeries(Number(req.body.min), Number(req.body.max),startDate);
	console.log("data series: ", dataArr);
    var chartConfig = {
        options: {
            chart: {
                type: req.body.type
            }
        },
         xAxis: {
        type: 'datetime',
        labels: {
            format: '{value:%Y-%m-%d}',
            // rotation: 45,
            // align: 'left'
        }
    },

    series: [{
        data: dataArr,
        pointStart: Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
        pointInterval: 24 * 36e5
    }],
        title: {
            text: req.body.title
        },

        loading: false
    }
    console.log("chartConfig: ", chartConfig);
    res.send(chartConfig);
});




module.exports = router;