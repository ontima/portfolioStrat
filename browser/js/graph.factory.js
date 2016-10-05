app.factory('GraphFactory', function($http){
	return {
		getById: function(id) {
			return $http.get("/api/graphs/" + id)
				.then(function(result){
					return result.data;
				});
		},
		getAll: function(){
			return $http.get("/api/graphs")
				.then(function(result){
					return result.data;
				});
		},
		saveChart: function(newChart) {
			console.log("inside factory");
			return $http.post("/api/graphs", newChart)
				.then(function(result){
					return result.data;
				})
		} 
	};
});