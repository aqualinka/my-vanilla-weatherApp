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

//show weather
function showWeather(response){
  console.log(response);

  let cityHeadingElement = document.querySelector("#city-heading");
  let tempCelsiusElement = document.querySelector("#celsius");
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
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  
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


showCity("arrecife");

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
  
  let currentButton = document.querySelector(".button-current");
  currentButton.addEventListener("click",getCurrentLocation);



