var Promise = require('bluebird');
var mongoose = require('mongoose');
var dbURI = process.env.URI || 'mongodb://localhost/portfolioStratTest';

var Graph = mongoose.model('graph', mongoose.Schema({
	chartType: {type: String, required: true},
	dataSeries: {type: Array, required: true},
	min: {type: Number, required: true},
	max: {type: Number, required: true},
	title: {type: String, required: true}
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