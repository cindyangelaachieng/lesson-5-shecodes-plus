//let date = document.querySelector("#date");

let now = new Date();
//let day = now.getDay();
//let month = now.getMonth();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
//day = days[now.getDay()];
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

//let date = now.getDate();
let minute = now.getMinutes();
let hour = now.getHours();

document.querySelector("#date").innerHTML = now.getDate();
document.querySelector("#day").innerHTML = days[now.getDay()];
document.querySelector("#month").innerHTML = months[now.getMonth()];
document.querySelector("#hours").innerHTML = (hour < 10 ? "0" : "") + hour;
document.querySelector("#min").innerHTML = (minute < 10 ? ":0" : ":") + minute;

function enterCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-search");
  let apiKey = "bc8c015e37beb9dba84c5e94d482acec";
  let apiSource = "https://api.openweathermap.org/data/2.5/";
  let apiUrl = `${apiSource}weather?q=${newCity.value}&appid=${apiKey}&units=metric`;
  let replaceCity = document.querySelector("#current-city");
  if (replaceCity.length >= 0) {
    replaceCity = replaceCity.trim();
  }
  replaceCity.innerHTML = `${newCity.value.toUpperCase()}`;
  //let newCity = document.querySelector("#city-search");

  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentWeather);
}

function currentWeather(weather) {
  let temperature = Math.round(weather.data.main.temp);
  let windSpeed = Math.round(weather.data.wind.speed);
  let hum = Math.round(weather.data.main.humidity);
  document.querySelector("#temp-num").innerHTML = `${temperature}`;
  document.querySelector("#wind").innerHTML = `${windSpeed}`;
  document.querySelector("#humidity").innerHTML = `${hum}`;

  //console.log(weather.main);
}

let citySearch = document.querySelector("#city-form");
citySearch.addEventListener("submit", enterCity);

//navigator.geolocation.getCurrentPosition(currentLocation);

function currentLocation(location) {
  let apiKey = "bc8c015e37beb9dba84c5e94d482acec";
  let apiSource = "https://api.openweathermap.org/data/2.5/";
  let apiUrl = `${apiSource}weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function showTemp(response) {
  event.preventDefault();
  let city = response.data.name.toUpperCase();
  let tempNum = document.querySelector("#temp-num");
  let temp = Math.round(response.data.main.temp);
  let currentCityLocation = document.querySelector("#current-city");
  let windSpeed = Math.round(response.data.wind.speed);
  let currentHumidity = Math.round(response.data.main.humidity);
  tempNum.innerHTML = `${temp}`;
  currentCityLocation.innerHTML = `${city}`;
  document.querySelector("#wind").innerHTML = `${windSpeed}`;
  document.querySelector("#humidity").innerHTML = `${currentHumidity}`;
}

//let currentCity = document.querySelector("#current-location");
//currentCity.addEventListener("submit", currentLocation);

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentCity = document.querySelector("#current-form");
currentCity.addEventListener("submit", getPosition);
