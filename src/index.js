function currentTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrsday",
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
  dayForm.innerHTML = `${day} ${hour}:${minute}`;
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

  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appId}`;

  axios.get(urlApi).then(currentTemp);
}
//temperatura del posto in cui si trova - corrente/attuale
function currentTemp(responsive) {
  let temp = Math.round(responsive.data.main.temp - 273.15); //ha i kelvin in temperatura ecosi si converte in celsius
  let city = responsive.data.name;
  celsius = temp;
  let h1Temp = document.querySelector(".current-temperature");
  let h1City = document.querySelector("#h1-city");

  h1City.innerHTML = city;
  h1Temp.innerHTML = temp + "°";
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
  //let getnuvole = responsive.data.clouds;
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
function changeTempTypeF(event) {
  //no default
  event.preventDefault();
  //finta temperatura
  let changeTemp = document.querySelector(".current-temperature"); //per cambiare l'h1

  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  changeTemp.innerHTML = fahrenheit + "°";
  //remove the active class from c
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
function changeTempTypeC(event) {
  //no default
  event.preventDefault();
  //finta temperatura
  let changeTemp = document.querySelector(".current-temperature"); //per cambiare l'h1

  changeTemp.innerHTML = celsius + "°";
  //add and remove la classe
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
}

let celsius = null;
currentTime();
//searchbutton
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

//change temp type f c
let fahrenheitLink = document.querySelector("#current-type");
fahrenheitLink.addEventListener("click", changeTempTypeF);

//f to c
let celciusLink = document.querySelector("#current-type-c");
celciusLink.addEventListener("click", changeTempTypeC);

//funzione per avere la temperatura attuale
let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", getCurrentTemperature);
