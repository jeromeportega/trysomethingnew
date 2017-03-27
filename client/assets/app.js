var app = angular.module('app', ['ngRoute']);
    //  use the config method to set up routing:
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/intro.html'
    })
    .when('/results', {
      templateUrl: 'partials/results.html',
      controller: 'ResultsController'
    })
    .when('/navigate/:id', {
      templateUrl: 'partials/navigation.html',
      controller: 'NavController'
    })
    .otherwise({
      redirectTo: '/'
    });

});
