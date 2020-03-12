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

    if (!date.value) return fetch(`https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${long}`);

    return fetch(`https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${long}&date=${date.value}`);
    })
    .then(dealWithResponse)
    .then(data => {
        totalCrimes = data.length
        data.forEach(item => {
            if (!crimes[item.category]) crimes[item.category] = 0
            crimes[item.category] += 1 
        });
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

    let objectKyes = Object.keys(crimes)
    let objectValues = Object.values(crimes)
    let maxWidth = Math.max(...objectValues)
    console.log(maxWidth)
    svg.setAttribute("viewBox", `0 0 ${maxWidth + 150} ${21.5 * objectValues.length}`)
    console.log(objectKyes, objectValues)

    var svgNS = "http://www.w3.org/2000/svg"; 
    svgtitle.innerText = `Crime Statistics in ${postcodeValue}`
    const title = document.createElement("title")
    title.innerText = `Crime Statistics in ${postcodeValue}`
    title.setAttribute("id", "title")
    svg.appendChild(title)
    let y = 0
    objectValues.forEach((value, index) => {
      const g = document.createElementNS(svgNS, "g")
      g.classList.add("bar")
      const rect = document.createElementNS(svgNS, "rect")
      rect.setAttribute("x", "0")
      rect.setAttribute("y", y)
      rect.setAttribute("width", value)
      rect.setAttribute("height", "20px")
      const text = document.createElementNS(svgNS, "text")
      text.setAttribute("x", value + 10)
      text.setAttribute("y", 10 + y)
      text.setAttribute("dy", "0.35em")
      text.setAttribute("class", "svgText")
      text.innerHTML = `${objectKyes[index]} ${objectValues[index]}`
      y += 21
          
      g.appendChild(rect)
      g.appendChild(text)

      svg.appendChild(g)
    })
    
    // g.appendChild(rect)

    // svg.appendChild(g)
    
  }