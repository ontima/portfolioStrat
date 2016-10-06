var dbURI = 'mongodb://localhost:27017/pStrat-testDB';
var clearDB = require('mocha-mongoose')(dbURI);
var expect = require('chai').expect;
var mongoose = require('mongoose');
var db = require('../../server/db/');
var Graph = db.models.Graph;
var app = require('../../server/app');
var request = require('supertest-as-promised')(require('../../server/app'));

describe('Graph Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

  describe('Graph retrieval', function(){
    var graph;

    var newGraph = {
   		title: 'test',
		min: 5,
		max: 50,
		chartType: 'Line',
		dataSeries: [0]
    }

   	beforeEach('Create a graph', function(done){

   		Graph.create(newGraph, function(err, _graph_){
   			graph = _graph_;
   			done();
   		})

   	});

   	it('can retrieve full list of graphs', function(){
   		return request.get('/api/graphs')
   			.then(function(res){
   				expect(res.body.length).to.equal(1);
   			});
   	});

   	it('can retrieve a graph by ID', function(){
   		return request.get('/api/graphs/' + graph._id)
   			.then(function(res){
   				expect(res.body.title).to.equal('test');
   			});
   	});

  });

});

