function showTempToday(response) {
  let cityName = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let dis = response.data.weather[0].description;
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

let apiKey = "2dd4a9a3477a790a05f1be4bfcb55931";

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${valueSearch}&appid=${apiKey}&units=metric`;

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
