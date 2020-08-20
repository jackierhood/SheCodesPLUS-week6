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

// City Change & API

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = `📍${response.data.name}`;
  document.querySelector("h2").innerHTML = `${Math.round(
    response.data.main.temp
  )}°F`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function search(city) {
  let apiKey = "8617d97507bbab7e839be3563b098506";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
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
