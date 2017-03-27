app.factory('resultsFactory', function($http) {
  var factory = {};
  if (!results) var results = [];
  if (!curPosition) var curPosition = {};

  //Gets user's position, and calls the route to use Yelp's API, then saves results.
  factory.getResults = function(callback) {
    //Finds user's location.
    if (navigator.geolocation) {
      var timeoutVal = 10 * 1000 * 10;
      navigator.geolocation.getCurrentPosition(
        displayPosition,
        displayError,
        { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    //Uses user's location to run search through Yelp API.
    function displayPosition(position) {
      curPosition = {
        'latitude': position.coords.latitude,
        'longitude': position.coords.longitude
      }
      console.log("Right before request.");
      $http.post('/search', { 'latitude': position.coords.latitude, 'longitude': position.coords.longitude }) .then(function(res) {
        if (callback && typeof callback == "function") {
          //Saves data to Factory, and sends it to controller.
          results.push(res.data);
          callback(res.data);
        }
      });
    }
  }

  //If location cannot be found.
  function displayError(error) {
    var errors = {
      1: 'Permission denied',
      2: 'Position unavailable',
      3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
  }

  //Get's the correct business from the data and sends it back to the controller.
  factory.getBusiness = function(item, callback) {
    var data;
    var checker;
    for(var i = 0; i < results[0].length; i++) {
      checker = results[0][i].id;
      if(checker === item.id) {
        data = results[0][i];
        console.log("Found!");
        break;
      }
    }
    callback(data);
  }

  //Returns user's location back to controller.
  factory.getPosition = function(callback) {
    callback(curPosition);
  }

  return factory;
})
