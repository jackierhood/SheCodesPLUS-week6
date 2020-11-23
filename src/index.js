//Time and Date
let now = new Date();
let dateElement = document.querySelector("#date");
let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let hours = now.getHours();
let minutes = now.getMinutes();

dateElement.innerHTML = `${day}, ${month} ${date} - ${hours}:${minutes}`;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    minutes = `0${minutes}`;
  }
}

// City Change & API

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = `📍${response.data.name}`;
  document.querySelector("#temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°F`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
      <div class="col-2">
          <h5>${formatHours(forecast.dt) * 1000}</h5>
          <img src="http://openweathermap.org/img/wn/${
            forecast[0].icon
          }@2x.png}" />
          <div class="weather-forecast-temperature">
          <strong>
          ${Math.round(forecast.main.temp_max)}°
          </strong> 
          ${Math.round(forecast.main.temp_min)}°
        </div>
      </div>
      `;
  }
}

function search(city) {
  let apiKey = "8617d97507bbab7e839be3563b098506";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function cityInput(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-lookup").value;
  search(cityName);
}

let searchCity = document.querySelector("#form-search");
searchCity.addEventListener("submit", cityInput);

search("New York");

// Bonus Current Location

function searchLocation(position) {
  let apiKey = "8617d97507bbab7e839be3563b098506";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
