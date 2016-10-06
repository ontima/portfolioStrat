app.factory('GraphFactory', function($http){
	return {
		getById: function(id) {
			return $http.get("/api/graphs/" + id)
				.then(function(result){
					return result.data;
				});
		},
		getAll: function(){
			console.log("inside factory getAll");
			return $http.get("/api/graphs")
				.then(function(result){
					return result.data;
				});
		},
		saveChart: function(newChart) {
			console.log("inside factory saveChart");
			return $http.post("/api/graphs", newChart)
				.then(function(result){
					return result.data;
				})
		} 
	};
});