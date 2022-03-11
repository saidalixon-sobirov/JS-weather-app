const api = {
  key: "573c2cd21a76c7a01f240366a4a3df46",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode === 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);

  let city = document.querySelector(".city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");

  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weatherElement = document.querySelector(".weather");
  weatherElement.innerHTML = `${weather.weather[0].main}`;

  let upDown = document.querySelector(".up-down");
  upDown.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max
  )}°C`;
}

function dateBuilder(a) {
  let months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "April",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  let weekDays = [
    "yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];

  let haftaKuni = weekDays[a.getDay()];
  let sana = a.getDate();
  let oyNomi = months[a.getMonth()];
  let yil = a.getFullYear();

  return `${haftaKuni} ${sana} ${oyNomi} ${yil}`;
}
