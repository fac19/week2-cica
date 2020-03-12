const postcode = document.querySelector(".postcode");
let lat = 51.510357;
let long = -0.116773;
let zoom = 8
let totalCrimes = 0
let crimes = {}
let postcodeValue = ""
let date = document.querySelector("[name=date]")

const svg = document.querySelector("svg")
// console.log(svg)
const svgtitle = document.querySelector("#svgTitle")

postcode.addEventListener("submit", event => {
  event.preventDefault();
   postcodeValue = event.target.elements.postcode.value;
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
    .then(createSvgContent)
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
      document.getElementById('map'), {zoom: zoom, center: yourArea});
      var marker = new google.maps.Marker({position: yourArea, map: map});
  }

  function createSvgContent() {
    var svgNS = "http://www.w3.org/2000/svg"; 
    svgtitle.innerText = `Crime Statistics in ${postcodeValue}`
    const title = document.createElement("title")
    title.innerText = `Crime Statistics in ${postcodeValue}`
    title.setAttribute("id", "title")
    svg.appendChild(title)
    
    const g = document.createElementNS(svgNS, "g")
    g.classList.add("bar")
    svg.appendChild(g)

    const rect = document.createElement("rect")
    rect.setAttribute("width", crimes.burglary)
    rect.setAttribute("height", "20")
    g.appendChild(rect)

    const text = document.createElement("text")
    text.setAttribute("x", "45")
    text.setAttribute("y", "9.5")
    text.setAttribute("dy", "0.35em")
    text.innerText = "fake name"
    g.appendChild(text)
  }