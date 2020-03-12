const postcode = document.querySelector(".postcode");
let lat = 51.510357;
let long = -0.116773;
let zoom = 8
let totalCrimes = 0
let crimes = {}

postcode.addEventListener("submit", event => {
  event.preventDefault();
  const postcodeValue = event.target.elements.postcode.value;
  fetch(`https://api.postcodes.io/postcodes/${postcodeValue}`)
  .then(dealWithResponse)
  .then(data => {
    lat = data.result.latitude;
    long = data.result.longitude;
    zoom = 15
    return fetch(`https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${long}`);
  })
  .then(dealWithResponse)
  .then(data => {
    totalCrimes = data.length
    data.forEach(item => {
      if (!crimes[item.category]) crimes[item.category] = 0
      crimes[item.category] += 1 
      console.log(item.category)
    });
  })
  .then(initMap)
  .catch(error => {
    console.log(error);
  });


function dealWithResponse(response) {
  if (!response.ok) throw new Error(response.status);
  return response.json();
  }
})

 function initMap() {
    var yourArea = {lat: lat , lng: long};
    var map = new google.maps.Map(
      document.getElementById('map'), {zoom: zoom, center: yourArea});
      var marker = new google.maps.Marker({position: yourArea, map: map});
    }