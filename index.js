function showTempToday(response) {
  let cityName = response.data.city;
  let currentTemp = Math.round(response.data.temperature.current);
  let wind = response.data.wind.speed;
  let humidity = response.data.temperature.humidity;
  let dis = response.data.condition.description;
  let cityText = document.querySelector("#city-name");
  let tempText = document.querySelector("#temp-text");
  let weatherDis = document.querySelector("#weather-dis");
  let hum = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  cityText.innerHTML = cityName;
  tempText.innerHTML = currentTemp;
  windSpeed.innerHTML = wind;
  weatherDis.innerHTML = dis;
  hum.innerHTML = humidity;
}

let apiKey = "4b44333bbcda5f0o6aaf4bt96ce9c0cd";

function currentPosition(possition) {
  let long = possition.data.coordinates.longitude;
  let lat = possition.data.coordinates.latitude;
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
  let min = dateNew.getMinutes();

  let fordate = ` ${todayIs}, ${hours}:${min}`;
  return fordate;
}

let h3 = document.querySelector("#times-today");
h3.innerHTML = todayTime(new Date());

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

////farnenhite change
/*function showFaren(event) {
  event.preventDefault();
  let celi = document.querySelector("#temp-text");
  let farn = (celi.innerHTML * 9) / 5 + 32;
  celi.innerHTML = farn;
}
let linkF = document.querySelector("#faren");
linkF.addEventListener("click", showFaren);*/
