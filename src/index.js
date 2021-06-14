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
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let h1Temp = document.querySelector(".current-temperature");
  h1Temp.innerHTML = `${searchTemp} C°`;
}

//funzione per cambiare da F a C e viceversa
function changeTempType(event) {
  //no default
  event.preventDefault();
  //finta temperatura
  let typeTemp = document.querySelector("#current-type"); //leggo a per capire se c'è f o no
  let changeType = document.querySelector(".current-temperature"); //per cambiare l'h1

  let temp = changeType.textContent.substring(0, 2); //leggo i gradi

  //se il tipo è c allora converto tutto
  if (typeTemp.textContent === "°C") {
    let celsius = Math.round(((temp - 32) * 5) / 9);

    changeType.innerHTML = celsius + "°C ";

    typeTemp.innerHTML = "°F";
  } else {
    //se il valore premuto è f allora converto in f
    let fahrenheit = Math.round((temp * 9) / 5 + 32);
    typeTemp.innerHTML = "°C";

    changeType.innerHTML = fahrenheit + "°F";
  }
}
//temperatura attuale
function getCurrentTemperature() {
  navigator.geolocation.getCurrentPosition(positionNow);
}

function positionNow(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let appId = "c6c5df81762dca8f7c5fc66d49902bfd";

  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appId}`;

  axios.get(urlApi).then(currentTemp);
}

function currentTemp(responsive) {
  let temp = Math.round(responsive.data.main.temp - 273.15); //ha i kelvin in temperatura ecosi si converte in celsius
  let city = responsive.data.name;

  let h1Temp = document.querySelector(".current-temperature");
  let h1City = document.querySelector("#h1-city");

  h1City.innerHTML = city;
  h1Temp.innerHTML = temp + "°C";
}

//searchbutton
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

currentTime();

//change temp type f c
let typeTemp = document.querySelector("#current-type");
typeTemp.addEventListener("click", changeTempType);

//funzione per avere la temperatura attuale
let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", getCurrentTemperature);
