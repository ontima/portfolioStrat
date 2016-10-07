app.controller('GraphCtrl', function($scope, GraphFactory){

	$scope.getGraph = function(){
		GraphFactory.getById($scope.selectedGraph)
			.then(function(response){
				displayGraph(response);
			})
	}

	$scope.addChart = function(){
		GraphFactory.saveChart($scope.newChart)
			.then(function(response){
				displayGraph(response);
				getAllGraphs();
				$scope.selectedGraph=response._id;
			})
	}

	displayGraph = function(response) {
		var startDate = response.dataSeries[0].data[0][0];
		//startDate is in yyyy-mm-dd format
		var startYear = Number(startDate.substring(0,4));
		var startMonth = Number(startDate.substring(5,7));
		var startDay = Number(startDate.substring(8));

 	  var dataSeries = [];
 	  for (var i=0; i<response.dataSeries.length; i++) {
	 	  dataSeries.push({
		  	data: response.dataSeries[i].data,
		  	pointStart: Date.UTC(startYear, startMonth, startDay),
		  	pointInterval: 24 * 36e5
		  });	  	
 	  }

	  $scope.chartConfig = {
	    options: {
	    	chart: {type: response.chartType}
	    	},
	    	xAxis: {
	      	type: 'datetime',
	      	labels: {
	          format: '{value:%Y-%m-%d}',
	          rotation: 45,
	          align: 'left'
	      		}
	  		},
	  		series: dataSeries,
	      title: {text: response.title},
	      loading: false
	  	};

		$scope.results = true;
	};

	getAllGraphs = function(){
		GraphFactory.getAll()
			.then(function(response){
				$scope.allGraphs = response;
			});
	};

	getAllGraphs();

});