// select dom
let courantLocationName = document.getElementById('currant-location-name')
let courantTemperature = document.getElementById('courant-temperature')
let weatherDescription = document.getElementById('weather-description')

// load data form api when page load
window.addEventListener('load', () => {
    let long;
    let lat;
    // take user location 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { longitude, latitude } = position.coords
            long = longitude
            lat = latitude
            // fetch data form api
            const key = "7b4f5ff562788cff6754ecec1fbc774c"
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`
            fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    let weather = data.weather[0].main
                    console.log(weather);

                    courantLocationName.innerText = data.name;
                    console.log();
                    weatherDescription.innerText = data.weather[0].description;
                    courantTemperature.innerText = data.main.temp;
                    let icon;
                    if (weather == 'Clouds') {
                        icon = 'PARTLY_CLOUDY_NIGHT'
                    }
                    showIcon(icon, document.getElementById('icon'))

                })
        });
    }

    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    function showIcon(icon, iconId) {
        const skycons = new Skycons({ "color": "white" });
        skycons.play();
        return skycons.set(iconId, skycons[icon])
    }
})