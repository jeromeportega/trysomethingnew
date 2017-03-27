app.controller('ResultsController', function($scope, $location, resultsFactory) {
  $scope.results = [];
  if (!address) var address = "";

  //Gets the results from the results factory to display to the user.
  resultsFactory.getResults(function(data) {
    var count = 0;
    if (data.errors) {
      $scope.errors = data.errors;
    } else {
      for(var i = 0; i < data.length; i++){
        $scope.results.push(data[i]);
      }
    }
  });
});
