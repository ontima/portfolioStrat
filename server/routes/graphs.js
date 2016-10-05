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
		arr.push(randomIntFromInterval(min,max));
	}
	return arr;
}

router.post('/', function(req, res, next){
	console.log("inside router post: ", req.body);
	var startDate = randomDate(new Date(2015,01,01), new Date(2016,10,05));
	console.log("startDate: ", startDate);
	//console.log("startDate: ", startDate.toUTCString());
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
        //data: [1029.9, 1071.5, 1106.4, 1129.2, 1144.0, 1176.0, 1135.6, 1148.5, 1216.4, 1194.1, 1095.6, 1054.4],
        //data: [{ series: [1029.9, 1071.5, 1106.4, 1129.2, 1144.0, 1176.0, 1135.6, 1148.5, 1216.4, 1194.1, 1095.6, 1054.4]}],
        //pointStart: Date.UTC(2013, 02, 15),
        //pointStart: startDate,
        data: dataArr,
        //data: [["2013-02-15", 100], ["2013-02-16", 120]],
        pointStart: Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
        pointInterval: 24 * 36e5
    }],
        // series: [{
        //     data: [2015-04-03, 15, 12, 8, 7]
        // }, {
        // 	data: [20, 5, 15, 2, 9]
        // }],
        title: {
            text: req.body.title
        },

        loading: false
    }
    console.log("chartConfig: ", chartConfig);
    res.send(chartConfig);
});




module.exports = router;