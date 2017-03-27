app.factory('resultsFactory', function($http) {
  var factory = {};
  if (!results) var results = [];
  if (!curAddress) var curAddress;
  if (!linkAddress) var linkAddress = "";

  //Uses user's current address and calls the route to use Yelp's API, then saves results.
  factory.getResults = function(callback) {
    console.log(curAddress);
    var address = "";
    var name = "";
    for (var i = 0; i < curAddress.name.length; i++) {
      if (curAddress.name[i] != " ") name += curAddress.name[i];
      else name += "+";
    }
    address += curAddress.number + ", " + curAddress.name + ", " + curAddress.city + ", " + curAddress.zip;
    linkAddress = curAddress.number + "+" + name + "+" + curAddress.city + "+" + curAddress.zip;
    console.log(linkAddress);

    //Uses user's location to run search through Yelp API.
    $http.post('/search', { 'address': address }).then(function(res) {
      if (callback && typeof callback == "function") {
        //Saves data to Factory, and sends it to controller.
        results.push(res.data);
        callback(res.data);
      }
    })
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

  factory.saveAddress = function(address) {
    curAddress = address;
  }

  //Returns user's location back to controller.
  factory.getPosition = function(callback) {
    callback(linkAddress);
  }

  return factory;
})
