//global variable --> temperature
let celsiusTemp = null;

//show current date and time
 function formatDate(timestamp){
    let current = new Date(timestamp);
    let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
    ];
    let day = days[current.getDay()];
    let hours = current.getHours();
    let minutes = current.getMinutes();

    if (hours < 10){
        hours = `0${hours}`;
    }
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    let currentDate = `${day} ${hours}:${minutes}`;
    return currentDate;
    }
//function creating day of the week for the weather forecast function
function formatDay(timestamp){
  let date = new Date(timestamp *1000);
  let day = date.getDay();
  let days = ["sun","mon","tue","wed","thu","fri","sat"];

  return days[day];
}


//new function displaying forecast
function displayForecast(response){
  //console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  //let days = ["monday","tuesday","wednesday","thursday", "friday", "saturday"];

  forecast.forEach(function(forecastday, index){
    if(index < 6){
      forecastHTML += `
      <div class="col-2 weather-forecast-col">
          <div class="weather-forecast-day">
              ${formatDay(forecastday.dt)}
          </div>
          <img src="http://openweathermap.org/img/wn/${forecastday.weather[0].icon}@2x.png" alt="${forecastday.weather[0].icon}">
          <div>
              <span class="temp-for-max temp">${Math.round(forecastday.temp.max)}ºC</span>|<span class="temp-for-min temp">${Math.round(forecastday.temp.min)}ºC</span>
          </div>
      </div>`;   
    } 
  });
forecastHTML += `</div>`;
forecastElement.innerHTML = forecastHTML;
}

//do api call for weather forecast through coordinates
function getForecast(coordinates){
  //console.log(coordinates);
  let apiKey = "02466604a7f7484e8595ebcea0826deb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//show weather
function showWeather(response){
  //console.log(response);

  let cityHeadingElement = document.querySelector("#city-heading");
  let tempCelsiusElement = document.querySelector("#temperature");
  let tempFeelElement = document.querySelector("#feels-like");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");  
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  //temperature in celsius
  celsiusTemp = response.data.main.temp;
  
  cityHeadingElement.innerHTML = response.data.name;
  tempCelsiusElement.innerHTML = Math.round(celsiusTemp);
  tempFeelElement.innerHTML = Math.round(response.data.main.feels_like);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  
  //call the getForecast function
  getForecast(response.data.coord);
}
//show city
function showCity(city) {
    let apiKey = "02466604a7f7484e8595ebcea0826deb";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}
//searchEngine -submit the form
function handleSubmit(event){
    event.preventDefault();
    let cityInput = document.querySelector("#search-input").value;
    showCity(cityInput);
}

let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit",handleSubmit);

//get current location- handle click button
function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  
//get position from server
function showPosition(position) {
  //console.log(position.coords.latitude);
  //console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `02466604a7f7484e8595ebcea0826deb`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(showWeather);
}

//show fahrenheit temperature
function showFahrtemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);

  let tempFeelElement = document.querySelector("#feels-like");
  tempFeelElement.innerHTML = Math.round(fahrenheitTemp);

  let tempUnit = document.querySelector("#celsius-feel");
  tempUnit.innerHTML = "ºF";

  //remove the active class from celsius link 
  celsiusLink.classList.remove("active");
  //add active class to fahrenheit link
  fahrenheitLink.classList.add("active");
}
function showCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);

  let tempFeelElement = document.querySelector("#feels-like");
  tempFeelElement.innerHTML = Math.round(celsiusTemp);

  let tempUnit = document.querySelector("#celsius-feel");
  tempUnit.innerHTML = "ºC";

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}


let currentButton = document.querySelector(".button-current");
currentButton.addEventListener("click",getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrtemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

showCity("arrecife");