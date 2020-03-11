const postcode = document.querySelector(".postcode");
let lat = 0;
let long = 0;

postcode.addEventListener("submit", event => {
  event.preventDefault();
  const postcodeValue = event.target.elements.postcode.value;
  fetch(`https://api.postcodes.io/postcodes/${postcodeValue}`)
    .then(dealWithResponse)
    .then(data => {
      lat = data.result.latitude;
      long = data.result.longitude;
    //   console.log(lat, long);
      return fetch(`https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${long}`);
    })
    .then(dealWithResponse)
    .then(data => {
      data.forEach(item => console.log(item.category));
      // console.log(data)
    })
    .catch(error => {
      console.log(error);
    });
});

function dealWithResponse(response) {
    if (!response.ok) throw new Error(response.status);
      return response.json();
}