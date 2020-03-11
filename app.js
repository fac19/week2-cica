const postcode = document.querySelector(".postcode")

postcode.addEventListener('submit', event => {
    event.preventDefault();
    const postcodeValue = event.target.elements.postcode.value
    fetch(`https://api.postcodes.io/postcodes/${postcodeValue}`)
    .then(response => {
        if (!response.ok) throw new Error(response.status)
        return response.json()
    })
    .then(data => {
        var lat = 0;
        lat += data.result.latitude
        var long = 0;
        long += data.result.longitude
    })
})