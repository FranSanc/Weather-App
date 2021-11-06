let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;
  return formattedDate;
}

let date = document.querySelector("#current-time-date");
date.innerHTML = formatDate(currentTime);
//challenge1:show real data temperature
function showTemperature(response) {
  console.log(response.data);
  let city = document.querySelector("#city");
  city.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${temperature} C°`;
}

function showValues(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-city");
  let city = document.querySelector("#city");
  city.innerHTML = `${newCity.value}`;
  let apiKey = "14ae7857ff700daefb749e38ecc205df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showValues);

//Bonus:Add current location button,get your GPS coordinates,display city & current temperature

function searchLocation(position) {
  let apiKey = "14ae7857ff700daefb749e38ecc205df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
