window.addEventListener('load', () => {

    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { longitude, latitude } = position.coords
            long = longitude
            lat = latitude
            const key = "7b4f5ff562788cff6754ecec1fbc774c"
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`

            fetch(api)
                .then(response => response.json())
                .then(data => console.log(data))
        });
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }


})