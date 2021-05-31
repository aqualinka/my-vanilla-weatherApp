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
    let months = ["January","February","March","April","May","Jun","July","August",
    "September","October","November","December"];
    let day = days[current.getDay()];
    let date = current.getDate();
    let month = months[current.getMonth()];
    let hours = current.getHours();
    let minutes = current.getMinutes();

    if(date == 1){
      date = `${date}st`;
    } else if(date == 2){
      date = `${date}nd`;
    } else if(date == 3){
      date = `${date}rd`;
    } else{
      date = `${date}th`;
    }

    if (hours < 10){
        hours = `0${hours}`;
    }
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    let currentDate = `Hello! Today's ${day} ${date} ${month} ${hours}:${minutes}`;
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
    if(index < 6 && index > 0){
      forecastHTML += `
      <div class="col-2 weather-forecast-col">
          <img src="http://openweathermap.org/img/wn/${forecastday.weather[0].icon}@2x.png" alt="${forecastday.weather[0].icon}">
          <div class="weather-forecast-day">
              ${formatDay(forecastday.dt)}
          </div>
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
  console.log(coordinates);
  let apiKey = "728f15542e17d610b9afb1e420062506";
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

  
  cityHeadingElement.innerHTML = response.data.name;
  tempCelsiusElement.innerHTML = Math.round(response.data.main.temp);
  tempFeelElement.innerHTML = Math.round(response.data.main.feels_like);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
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
    let apiKey = "728f15542e17d610b9afb1e420062506";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}
//searchEngine -submit the form
function handleSubmit(event){
    event.preventDefault();
    let cityInput = document.querySelector("#search-input").value;
    showCity(cityInput);
}

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

let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit",handleSubmit);

let currentButton = document.querySelector(".button-current");
currentButton.addEventListener("click",getCurrentLocation);

showCity("Las Palmas");