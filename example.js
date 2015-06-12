var tenBis = require('./index.js');
tenBis
  .getRestaurantsByAddress('נמל תל אביב')
  .then(function (names) {
    console.log(names);
  });
