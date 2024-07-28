async function getWeather() {
    const apiKey = '09e6a216c3aa5d2ed551ff420cfe2157'; // Replace with your OpenWeatherMap API key
    const location = document.getElementById('locationInput').value;
    const weatherInfoDiv = document.getElementById('weatherInfo');

    if (!location) {
        weatherInfoDiv.innerHTML = '<p>Please enter a location.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        const weatherData = await response.json();
        displayWeatherInfo(weatherData);
    } catch (error) {
        weatherInfoDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeatherInfo(data) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
