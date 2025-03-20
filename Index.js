document.getElementById('getWeather').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Please enter a city');
        return;
    }

    const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherData = data.weather[0];
                const mainData = data.main;

                const weatherHtml = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p><strong>Weather:</strong> ${weatherData.main} - ${weatherData.description}</p>
                    <p><strong>Temperature:</strong> ${mainData.temp} °C</p>
                    <p><strong>Humidity:</strong> ${mainData.humidity} %</p>
                    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                `;

                document.getElementById('weatherInfo').innerHTML = weatherHtml;
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching the weather data.');
        });
}
