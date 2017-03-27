var bodyParser  = require('body-parser'),
    express     = require('express'),
    path        = require('path'),
    app         = express(),
    yelp        = require('yelp-fusion');

var token = "1VGOAKY4xoWhBXymfLTrjNPp_w7hgp3J8i2wa1SAAskucolv4GN7arEIoZewpjBbZCnvkiEg865of83PcIg37oY5Xs8mTEerPyVGQI96_ukCW42onkCfyoqB0WrFWHYx";

var client = yelp.client(token);

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));
app.use(bodyParser.json());

//Uses data to run the search through Yelp to get results, and sends data back to factory.
app.post('/search', function(req, res) {
  console.log(req.body);
  console.log("Searching now!");
  client.search({
    term: 'restaurants',
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    open_now: true,
    sort_by: 'rating',
    limit: 3,
    radius: 8050
  }).then(response => {
    console.log(response.jsonBody.businesses);
    res.json(response.jsonBody.businesses);
  }).catch(e => {
    console.log(e);
    res.json(e);
  })
})

app.listen(8000, function() {
  console.log('Try something new on port 8000!');
});
