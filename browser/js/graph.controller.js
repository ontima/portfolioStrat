app.controller('GraphCtrl', function($scope, GraphFactory){

	$scope.addChart = function(){
		console.log("inside controller: ", $scope.newChart);
		GraphFactory.saveChart($scope.newChart)
			.then(function(response){
				console.log("controller response: ", response);
				console.log("response type: ", response.chartType);	
				var startDate = response.dataSeries[0][0];
				//startDate is in yyyy-mm-dd format
				var startYear = Number(startDate.substring(0,4));
				var startMonth = Number(startDate.substring(5,7));
				var startDay = Number(startDate.substring(8));
				console.log(startYear);
				console.log(startMonth);
				console.log(startDay);
    
		    $scope.chartConfig = {
		        options: {
		            chart: {
		                type: response.chartType
		            }
		        },
		         xAxis: {
		        type: 'datetime',
		        labels: {
		            format: '{value:%Y-%m-%d}',
		        }
		    },
		    series: [{
		        data: response.dataSeries,
		        pointStart: Date.UTC(startYear, startMonth, startDay),
		        pointInterval: 24 * 36e5
		    }],
		        title: {
		            text: response.title
		        },

		        loading: false
		    }

				$scope.results = true;
			})
	}


});