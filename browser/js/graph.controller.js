app.controller('GraphCtrl', function($scope, GraphFactory){

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: 'Hello'
        },

        loading: false
    }

        $scope.chartConfig2 = {
        options: {
            chart: { type: 'line' },
            rangeSelector: { enabled: true },
            navigator: { enabled: true }
        },
        title: { text: 'No charts found' },
        size: { height: 500 },
        loading: true,
        useHighStocks: true
    }

 $scope.highchartsNG = {
        options: {
            chart: {
                type: 'bar'
            },
            loading: {
            labelStyle: {
            fontWeight: 'bold', position: 'relative', top: '45%'
            }
        },
        lang :{
        	loading:'Loading...'
        }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: 'Hello'
        },
        loading: false
    }



});