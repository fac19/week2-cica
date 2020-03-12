const postcode = document.querySelector(".postcode");
let lat = 51.510357;
let long = -0.116773;
let zoom = 8
let totalCrimes = 0
let crimes = {}

let date = document.querySelector("[name=date]")


postcode.addEventListener("submit", event => {
  event.preventDefault();
  const postcodeValue = event.target.elements.postcode.value;
  fetch(`https://api.postcodes.io/postcodes/${postcodeValue}`)
  .then(dealWithResponse)
  .then(data => {
    lat = data.result.latitude;
    long = data.result.longitude;
    zoom = 15
    console.log(date.value)
    //   console.log(lat, long);
    
    if (!date.value) return fetch(`https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${long}`);
    
    return fetch(`https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${long}&date=${date.value}`);
  })
  .then(dealWithResponse)
  .then(data => {
    totalCrimes = data.length
    data.forEach(item => {
      if (!crimes[item.category]) crimes[item.category] = 0
      crimes[item.category] += 1 
      // console.log(item.category)
    });
    console.log(totalCrimes, crimes)
  })
  .then(initMap)
  .catch(error => {
    console.log(error);
  });
})


function dealWithResponse(response) {
  if (!response.ok) throw new Error(response.status);
  return response.json();
}


function initMap() {
  var yourArea = {lat: lat , lng: long};
  var map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: zoom, 
      center: yourArea,
      streetViewControl: false,
      mapTypeControl: false,
      styles: [
        {
          "featureType": "all",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            },
            {
              "saturation": "-100"
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "saturation": 36
            },
            {
              "color": "#000000"
            },
            {
              "lightness": 40
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "white"
            },
            {
              "lightness": 16
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#000000"
            },
            {
              "lightness": 20
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#000000"
            },
            {
              "lightness": 17
            },
            {
              "weight": 1.2
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            },
            {
              "lightness": 20
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#4d6059"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4d6059"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#4d6059"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "lightness": 21
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#4d6059"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4d6059"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#7f8d89"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#7f8d89"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#7f8d89"
            },
            {
              "lightness": 17
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#7f8d89"
            },
            {
              "lightness": 29
            },
            {
              "weight": 0.2
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            },
            {
              "lightness": 18
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#7f8d89"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#7f8d89"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            },
            {
              "lightness": 16
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#7f8d89"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#7f8d89"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            },
            {
              "lightness": 19
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "color": "#2b3638"
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2b3638"
            },
            {
              "lightness": 17
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#24282b"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#24282b"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
      
    });
    
    var marker = new google.maps.Marker({position: yourArea, map: map});
    
  }
  