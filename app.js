// select element dom
let courantLocationName = document.getElementById('currant-location-name')
let courantTemperature = document.getElementById('courant-temperature')
let weatherDescription = document.getElementById('weather-description')
let iconId = document.getElementById('icon')
let temperatureNumSection = document.querySelector('.temperature-number')
let samp = document.querySelector('samp')


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
        let api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`
        fetch(api)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // set data to dom form api
                courantLocationName.innerText = data.name;
                console.log();
                weatherDescription.innerText = data.weather[0].description;
                courantTemperature.innerText = Math.floor(data.main.temp - 273)//.toFixed(2);
                samp.innerHTML = '&degC'

                // show icon
                let weather = data.weather[0].main.toUpperCase()
                if (weather = "CLOUDS") {
                    weather = "CLOUDY"
                    showIcon(iconId, weather)
                }
                else {
                    console.log(weather);
                    showIcon(iconId, weather)
                }

                // this function make my convert fahrenheit to Celsius 
                temperatureNumSection.addEventListener('click', () => {
                    let temperatureNum = temperatureNumSection.children[0]
                    let span = temperatureNumSection.children[1]

                    if (span.innerText == "°C") {
                        span.innerHTML = "&degF"
                        // formula for Fahrenheit
                        let fahrenheit = (9 / 5) * temperatureNum.innerText + 32
                        temperatureNum.innerText = Math.floor(fahrenheit)

                    }
                    else if (span.innerText == "°F") {
                        span.innerHTML = "&degC"
                        courantTemperature.innerText = Math.floor(data.main.temp - 273)
                    }

                })
            })
    });
}

else {
    x.innerHTML = "Geolocation is not supported by this browser.";
}

function showIcon(iconId, weather) {
    const skycons = new Skycons({ "color": "white" });
    skycons.add(iconId, Skycons[weather]);
    skycons.play();
}




