function currentTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDate = new Date();
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let dayForm = document.querySelector("#date-content");
  dayForm.innerHTML = `Last update: ${day} ${hour}:${minute}`;
}
function start(city) {
  let apiKey = "c6c5df81762dca8f7c5fc66d49902bfd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let cityH1 = document.querySelector("#h1-city");
  cityH1.innerHTML = city;
  axios.get(apiUrl).then(searchTemp);
}
//cerca la citta dentro l'api dato
function searchCity(event) {
  event.preventDefault();
  let cityH1 = document.querySelector("#h1-city");
  let city = document.querySelector("#city-input").value;

  let apiKey = "c6c5df81762dca8f7c5fc66d49902bfd";

  //per il tempo della citta che si cerca
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  cityH1.innerHTML = city;
  axios.get(apiUrl).then(searchTemp);
}

//cambio temperatura dopo aver cercato una nuova citta
//add change wind too
function searchTemp(responsive) {
  let searchTemp = Math.round(responsive.data.main.temp);
  celsius = searchTemp;
  let h1Temp = document.querySelector(".current-temperature");
  h1Temp.innerHTML = `${searchTemp}°`;
  infoState(responsive);
  changeBK(searchTemp);
}

//temperatura attuale
function getCurrentTemperature() {
  navigator.geolocation.getCurrentPosition(positionNow);
}
//posizione attuale
function positionNow(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let appId = "c6c5df81762dca8f7c5fc66d49902bfd";

  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appId}&units=metric`;

  axios.get(urlApi).then(currentTemp);
}
//temperatura del posto in cui si trova - corrente/attuale
function currentTemp(responsive) {
  let temp = Math.round(responsive.data.main.temp);
  let city = responsive.data.name;
  celsius = temp;
  let h1Temp = document.querySelector(".current-temperature");
  let h1City = document.querySelector("#h1-city");

  h1City.innerHTML = city;
  h1Temp.innerHTML = celsius + "°";
  changeBK(temp);
  infoState(responsive);
}
//altre info -wind-stat-prec-img
function infoState(responsive) {
  let stateInfo = document.querySelector("#state-info");
  let windInfo = document.querySelector("#wind-info");
  let humidityInfo = document.querySelector("#humidity-info");
  let icon = document.querySelector("#icon");

  //let nuvoleInfo = document.querySelector(".state-info");
  let getWind = Math.round(responsive.data.wind.speed);
  let getDescription = responsive.data.weather[0].description;
  let getHumidity = Math.round(responsive.data.main.humidity);
  let getIcon = responsive.data.weather[0].icon;
  stateInfo.innerHTML = getDescription;
  windInfo.innerHTML = getWind;
  humidityInfo.innerHTML = getHumidity;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${getIcon}@2x.png`
  );
  icon.setAttribute("alt", getDescription);
  getForecast(responsive.data.coord);
  //let getnuvole = responsive.data.clouds;
}

//forecast

function getForecast(coordinates) {
  let appId = "c6c5df81762dca8f7c5fc66d49902bfd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${appId}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

//previsioni future
function displayForecast(response) {
  // console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#div-forecast");

  let forecastHTML = `<div class="row next-days">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `<div class="col">
            <div class="forecast-days">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" class="next-days-img" />
              <span class="forecast-max-temperature">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="forecast-min-temperature">${Math.round(
                forecastDay.temp.min
              )}°</span><br /><span
                class="forecast-date">${formatForcastDay(
                  forecastDay.dt
                )}</span></div></div>`;
    }
  });

  forecastHTML += "</div>";
  forecastElement.innerHTML = forecastHTML;
}
function formatForcastDay(data) {
  let date = new Date(data * 1000);
  let day = date.getDay();

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

//cambio background
function changeBK(info) {
  let backgroundChange = document.querySelector(".main");
  let backgroundHTML = document.querySelector("html");
  let backgroundBody = document.querySelector("body");
  if (info >= 20) {
    backgroundChange.style.backgroundImage = "url(img/bk-hot.png)";
    backgroundHTML.style.backgroundColor = "rgb(230, 204, 174)";
    backgroundBody.style.background = "rgb(230, 204, 174)";
  } else {
    backgroundChange.style.backgroundImage = `url(img/bk-cold.png)`;
    backgroundHTML.style.backgroundColor = "#97ddd8";
    backgroundBody.style.background = "#97ddd8";
  }
}
//funzione per cambiare da F a C e viceversa

let celsius = null;
currentTime();
//searchbutton
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

//funzione per avere la temperatura attuale
let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", getCurrentTemperature);

start("Zurich");
