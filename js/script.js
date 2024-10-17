const cities = [
    { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    { name: "Berlin", lat: 52.5200, lon: 13.4050 },
    { name: "Moscow", lat: 55.7558, lon: 37.6173 },
    { name: "Cairo", lat: 30.0444, lon: 31.2357 },
    { name: "Beijing", lat: 39.9042, lon: 116.4074 },
    { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
    { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
    { name: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
    { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
    { name: "Mexico City", lat: 19.4326, lon: -99.1332 },
    { name: "Istanbul", lat: 41.0082, lon: 28.9784 },
    { name: "Seoul", lat: 37.5665, lon: 126.9780 },
    { name: "Bangkok", lat: 13.7563, lon: 100.5018 },
    { name: "Dubai", lat: 25.276987, lon: 55.296249 },
    { name: "Rome", lat: 41.9028, lon: 12.4964 },
    { name: "Toronto", lat: 43.651070, lon: -79.347015 },
    { name: "Singapore", lat: 1.3521, lon: 103.8198 },
    { name: "Johannesburg", lat: -26.2041, lon: 28.0473 },
    { name: "Madrid", lat: 40.4168, lon: -3.7038 },
    { name: "Amman", lat: 31.9539, lon: 35.9106 },
    { name: "Zarqa", lat: 32.0728, lon: 36.0870 },
    { name: "Irbid", lat: 32.5556, lon: 35.8500 },
    { name: "Aqaba", lat: 29.5320, lon: 35.0060 },
    { name: "Jerash", lat: 32.2804, lon: 35.8993 },
    { name: "Al Karak", lat: 31.1855, lon: 35.7047 },
    { name: "Madaba", lat: 31.7165, lon: 35.7930 },
    { name: "Mafraq", lat: 32.3429, lon: 36.2080 },
    { name: "Tafila", lat: 30.8375, lon: 35.6041 },
    { name: "Ma'an", lat: 30.1920, lon: 35.7363 }
];

function renderWeather(data) {
    let div = document.getElementById('weather');
    
    let tempCelsius = (data.main.temp - 273.15).toFixed(2); 
    let condition = data.weather[0].description;
    let lat = data.coord.lat;  
    let lon = data.coord.lon; 
    
    let imageUrl = getImageUrl(condition); 

    let tag = `
        <div class="weather-card">
           <img src="${imageUrl}" alt="${condition}" class="weather-image"/>
            <h1>${data.name}</h1>
            <h2>Temperature: ${tempCelsius} °C</h2>
            <h3>Condition: ${condition}</h3>
            <h4>Latitude: ${lat} and Longitude: ${lon}</h4>  <!-- Display lat and lon -->       
        </div>
    `;
    div.innerHTML += tag;
}


function getImageUrl(condition) {
    const images = {
        "clear sky": "./image/clear sky.png",
        "few clouds": "./image/few clouds.png",
        "scattered clouds": "./image/few clouds.png",
        "broken clouds": "./image/broken clouds.webp",
        "shower rain": "./image/shower rain.png",
        "light rain": "./image/rain-removebg-preview.png",
        "thunderstorm": "./image/thunderstorm-removebg-preview.png",
        "snow": "./image/snow-removebg-preview.png",
        "mist": "./image/mist.png"
    };

    return images[condition] || "../image/clear sky.png"; 
}

function fetchWeather() {
    const apiKey = "10723b234cbdfca9349b1f164dafd8b8"; 
    cities.forEach(city => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => renderWeather(data))
            .catch(error => console.error("Error fetching weather data:", error));
    });
}

window.onload = fetchWeather;
