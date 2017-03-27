app.controller('NavController', function($scope, $routeParams, $sce, resultsFactory){
  $scope.navLink == "";
  var business = {};
  var curPosition = {};

  //Grabs current position from factory that was previously calculated.
  resultsFactory.getPosition(function(data) {
    curPosition = data;
  });

  //Grabs specific business from the resultsFactory and builds Google Maps link for HTML.
  resultsFactory.getBusiness($routeParams, function(data) {
    business = data;
    var mapLink = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBWZO3QUQT_tSQ0alwxhdyZlxEmrP0NEro&origin=" + curPosition.latitude + ',' + curPosition.longitude + "&destination=";
    for(var i = 0; i < business.location.display_address.length; i++) {
      for(var j = 0; j < business.location.display_address[i].length; j++) {
        if (business.location.display_address[i][j] != " ") mapLink += business.location.display_address[i][j];
        else mapLink += '+';
      }
      mapLink += " ";
    }
    mapLink += "&avoid=tolls|highways";
    $scope.navLink = $sce.trustAsResourceUrl(mapLink);
  });
});
