var dbURI = 'mongodb://localhost:27017/pStrat-testDB';
var clearDB = require('mocha-mongoose')(dbURI);
var expect = require('chai').expect;
var mongoose = require('mongoose');
var db = require('../../server/db/');
var Graph = db.models.Graph;

describe('Graph model', function() {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Graph).to.be.a('function');
    });

});