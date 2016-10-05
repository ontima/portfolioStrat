var Promise = require('bluebird');
var mongoose = require('mongoose');
var dbURI = process.env.URI || 'mongodb://localhost/portfolioStratTest';

var Graph = mongoose.model('graph', mongoose.Schema({
	chartType: String,
	data: Array,
	min: Number,
	max: Number,
	title: String
}));

var _conn;
module.exports = {
	connect: function(){
		if(_conn) {
			return _conn;
		}
		return _conn = new Promise(function(resolve, reject){
			mongoose.connect(dbURI, function(err){
				if(err) {
					return reject(err);
				}
				return resolve(mongoose.connection);
			});
		});
	},
	models: {
		Graph: Graph
	}
};