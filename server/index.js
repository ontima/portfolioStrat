var app = require('./app');
var db = require('./db');

var port = process.env.PORT || 3000;

db.connect()
	.then(function() {
		app.listen(port, function(){
			console.log(`listening on port ${port}`);
		});
	});