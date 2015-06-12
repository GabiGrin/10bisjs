var request = require('request');
var geocoder = require('node-geocoder')('google', 'http');
var Promise = require('promise');

var baseUrl = 'https://www.10bis.co.il/Restaurants/';

function apiRequest(url) {
  return new Promise(function (resolve, reject) {
    request.get(baseUrl + url, function (err, res) {
      if (err) reject(err);
      else resolve(JSON.parse(res.body));
    });
  });
}

var TenBis = function () {};

TenBis.prototype.getRestaurantsByCoordinates = function (lat, lon, maxDistance) {

  var url = 'SearchRestaurantsListByMapBoundaries?destinationLng=' + lon + '&destinationLat=' + lat + '&notrhBoundary=333.09966358838387&southBoundary=32.09330130083669&westBoundary=34.769518607379155&eastBoundary=34.777028792620854&isKosher=false&cuisineType=&FilterByCoupon=false&mapBoundsExtension=0.009';
  console.log('lat, long', lat, lon);
  console.log('url', url);
  return apiRequest(url)
    .then(function (res){
      console.log('res', res.length);
    }, function (err) {
      console.log('err', err);
    });
};
TenBis.prototype.getRestaurantsByLocation = function (address) {
  var getRestaurants = function (results) {
    var result = results[0] || results;
    if (result) {
      return this.getRestaurantsByCoordinates(result.latitude, result.longitude);
    }
  }.bind(this);

  return geocoder.geocode(address)
  .then(getRestaurants);
};

module.exports = new TenBis();