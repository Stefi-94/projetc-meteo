let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city");
city = city.trim();
city = city.toLowerCase();

if (city === "") {
  alert("You need to enter a city");
} else if (weather[city] !== null) {
  alert(
    "It is currently " +
      weather[city].temp +
      "°C (" +
      Math.round((weather[city].temp * 9) / 5 + 32) +
      "°F) in " +
      city +
      " with a humidity of " +
      weather[city].humidity +
      "%"
  );
} else {
  alert(
    "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
      city
  );
}
