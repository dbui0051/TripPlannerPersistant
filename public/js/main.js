'use strict';
/* global $ tripModule */

$(tripModule.load);

$.ajax({
  method: 'GET',
  url: '/api/hotels'
})
.then(function (responseData) {
  console.log(responseData);
})
.catch(function (errorObj) {
  console.log(errorObj);
});
