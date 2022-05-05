/* A variable that is storing the path to the weather API. */
var fetchWeather = "/weather";

/* Selecting the form and input from the HTML. */
const weatherFrom = document.querySelector("form");
const search = document.querySelector("input");

/* Selecting the weather icon and weather condition from the HTML. */
const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const tempElement = document.querySelector(".temperature span");
const locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

dateElement.textContent =
  new Date().getDate() +
  ", " +
  monthNames[new Date().getMonth()].substring(0, 3);

weatherFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.value);
  locationElement.textContent = "Loading...";
  tempElement.textContent = "";
  weatherCondition.textContent = "";
  const loctionApi = fetchWeather + "?address=" + search.value;
  fetch(loctionApi).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationElement.textContent = data.error;
        tempElement.textContent = "";
        weatherCondition.textContent = "";
      } else {
        console.log();
        if (data.description === "rain" || data.description === "fog") {
          weatherIcon.className = "wi wi-day-" + data.description;
        } else {
          weatherIcon.className = "wi wi-day-cloudy";
        }
        locationElement.textContent = data.cityName;
        tempElement.textContent =
          (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
        weatherCondition.textContent = data.description.toUpperCase();
      }
    });
  });
});
