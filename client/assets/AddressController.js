app.controller('AddressController', function($scope, $location, resultsFactory) {
  $scope.saveAddress = function() {
    resultsFactory.saveAddress($scope.address);
    $scope.address = "";
    $location.url('/results');
  }
});
