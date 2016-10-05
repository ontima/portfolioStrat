var mongoose = require('mongoose');
var Promise = require('bluebird');
var db = require('./server/db');
var Graph = db.models.Graph;

var wipeCollections = function () {
    var removeGraphs = Graph.remove({});
    return Promise.all([
        removeGraphs
    ]);
};

var seedGraphs = function() {
    var graphs = [
        {
            chartType: 'line',
            data: [10, 15, 12, 8, 7],
            min: 2,
            max: 10,
            title: 'test1'
        },
        {
            chartType: 'bar',
            min: 100,
            max: 500,
            title: 'test2'
        }
    ];

    return Graph.create(graphs);
};


db.connect()
    .then(function () {
        return wipeCollections();
    })
    .then(function(){
        return seedGraphs();
    })
    .then(function () {
        console.log('Seed successful!');
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
