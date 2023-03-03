let apiKey = "4b44333bbcda5f0o6aaf4bt96ce9c0cd";

/// displaying the next days forecast

function displayForecast(response) {
  let forecastElement = document.querySelector("#next-day-forcast");
  let forecastHtml = "";
  let days = ["Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` <div class="col">
            <div class="wather-forcast-date">${day}</div>
            <i class="fa-solid fa-sun"></i>
            <div class="weather-forcast-temp">
              <span class="weather-forcast-max">18°</span>
              <span class="weather-forcast-min">12°</span>
            </div>
          </div>`;
  });

  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coords) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coords.longitude}&lat=${coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTempToday(response) {
  //geting the city data
  //the city name from the data
  let cityName = response.data.city;
  //temp
  let currentTemp = Math.round(response.data.temperature.current);
  //wind
  let wind = response.data.wind.speed;
  //humidity
  let humidity = response.data.temperature.humidity;
  //description
  let dis = response.data.condition.description;

  // geting the id of each element
  let cityText = document.querySelector("#city-name");
  let tempText = document.querySelector("#temp-text");
  let weatherDis = document.querySelector("#weather-dis");
  let hum = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");

  celsiusTemp = response.data.temperature.current;

  //changing the inside of the id
  cityText.innerHTML = cityName;
  tempText.innerHTML = currentTemp;
  windSpeed.innerHTML = wind;
  weatherDis.innerHTML = dis;
  hum.innerHTML = humidity;

  //getting forecast coords
  getForecast(response.data.coordinates);

  //adding icons
  let iconElement = document.querySelector("#weather-now");
  let iconNowTemp = response.data.condition.icon;
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconNowTemp}.png`
  );
  iconElement.setAttribute("alt", `${iconNowTemp}`);
}

function currentPosition(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempToday);
}
function nav(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let linkCurrent = document.querySelector("#current-btn");
linkCurrent.addEventListener("click", nav);

///times

function todayTime(todayTimeInput) {
  let dateNew = todayTimeInput;
  let day = dateNew.getDay();
  let days = ["sun", "mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let todayIs = days[day];

  let hours = dateNew.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = dateNew.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  let fordate = ` ${todayIs}, ${hours}:${min}`;
  return fordate;
}

let h3 = document.querySelector("#times-today");
h3.innerHTML = todayTime(new Date());

//changing units
function changeToFaren(event) {
  event.preventDefault();
  let celElement = document.querySelector("#temp-text");
  ///remove active class from celsius link
  aCelsius.classList.remove("active");
  aFaren.classList.add("active");
  let farenFormula = (celsiusTemp * 9) / 5 + 32;

  celElement.innerHTML = Math.round(farenFormula);
}

function changeToCelsius(event) {
  event.preventDefault();
  aCelsius.classList.add("active");
  aFaren.classList.remove("active");
  let tempElement = document.querySelector("#temp-text");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let aFaren = document.querySelector("#faren");
aFaren.addEventListener("click", changeToFaren);

let aCelsius = document.querySelector("#celi");
aCelsius.addEventListener("click", changeToCelsius);

////city search

function changeCity(event) {
  event.preventDefault();
  let inputOfSearch = document.querySelector("#search-input");
  let valueSearch = inputOfSearch.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${valueSearch}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTempToday);
}
let button = document.querySelector("#search-btn");
button.addEventListener("click", changeCity);
