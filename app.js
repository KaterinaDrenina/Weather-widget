const weatherBlock = document.querySelector('#weather');

async function loadWeather(city) {
    weatherBlock.innerHTML = `
    <div class="weather__loading">
        <img src="images/loading.gif" alt="Loading...">
    </div>`;

    const apiKey = '00e18f246b4cf27be7ba875eb06f1eb7';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const responseResult = await response.json();

        if (response.ok) {
            getWeather(responseResult);
        } else {
            weatherBlock.innerHTML = responseResult.message;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherBlock.innerHTML = 'Failed to fetch weather data.';
    }
}


function getWeather(data){

    const location = data.name;
    const temp = (data.main.temp);
    const feelsLike = (data.main.feels_like);
    const pressure = (data.main.pressure);
    const humidity = (data.main.humidity);
    const speed = (data.wind.speed);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template = `
    <div class="weather__header">
        <div class="weather__main">
            <div class="weather__city">${location}</div>
            <div class="weather__temp">${temp}</div>
            <div class="weather__feels-like">Feels like: ${feelsLike}</div>
        </div>
        <div class="weather__status">
            <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
            <div class="weather__status">${weatherStatus}</div>
        </div>
    </div>
    <div class="weather__info">
        <div class="weather__humidity">Humidity: ${humidity} %</div>
        <div class="weather__speed">Wind speed: ${speed} km/h</div>
        <div class="weather__pressure">Pressure: ${pressure} hPa</div>
    </div>
    `;

    weatherBlock.innerHTML = template;
}

if(weatherBlock) {
    const cityToLoad = 'chicago';
    loadWeather(cityToLoad);
}