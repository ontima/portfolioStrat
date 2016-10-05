app.controller('GraphCtrl', function($scope, GraphFactory){

    // $scope.chartConfig = {
    //     options: {
    //         chart: {
    //             type: 'bar'
    //         }
    //     },
    //     series: [{
    //         data: [10, 15, 12, 8, 7]
    //     }],
    //     title: {
    //         text: 'Hello'
    //     },

    //     loading: false
    // }

	$scope.addChart = function(){
		console.log("inside controller: ", $scope.newChart);
		GraphFactory.saveChart($scope.newChart)
			.then(function(response){
				$scope.results = true;
				$scope.chartConfig = response;
			})
	}


});