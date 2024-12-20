import "./styles.css";
import { weatherDetails } from "./dateClass";

const events = (() => {
  //variable names
  //non html elements
  const api_token = "AKKUHWXN245EQX7F3Z94A5LWV";
  var city_name = "delhi";
  var todayDate;
  var endDate;
  var dayName;

  fetchWeather();
  //html elements
  const $text_input = document.querySelector("input");
  const $search_btn = document.querySelector("button");

  $search_btn.addEventListener("click", getLocation);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    todayDate = `${year}-${month}-${day}`;

    const endDateObj = new Date();
    endDateObj.setDate(today.getDate() + 4); // Add 7 days
    const endYear = endDateObj.getFullYear();
    const endMonth = String(endDateObj.getMonth() + 1).padStart(2, "0"); // End month
    const endDay = String(endDateObj.getDate()).padStart(2, "0"); // End day

    // Format the end date as YYYY-MM-DD
    endDate = `${endYear}-${endMonth}-${endDay}`;
  }

  function renderToday(details) {
    var div = document.querySelector("#day1");
    div.innerHTML = "";
    var childDiv = document.createElement("div");
    var siblingDiv = document.createElement("div");
    div.classList.add("today-components", "weather-details");
    childDiv.classList.add("location-details");
    childDiv.innerHTML = `
    <h1 id="location-currentDay">${details.address}</h1>
    <h2 id="time-currentDay">${details.time}, ${details.date
      .split("-")
      .reverse()
      .join("-")}</h2>
    `;
    siblingDiv.innerHTML = `
    <h3 id="day1-condition">${details.conditions}</h3>
    <h3 id="day1-temp">Temperature:${details.temp}F</h3>
    <h3 id="day1-wind">Wind Speed:${details.windSpeed}</h3>
    `;

    div.appendChild(childDiv);
    div.appendChild(siblingDiv);

    var iconDIv = document.querySelector("#day1-icon");
    iconDIv.innerHTML = `
    <img
      src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/SVG/1st%20Set%20-%20Color/${details.iconName}.svg"
      alt="Weather Icon"
    />
    `;
  }

  function renderOtherDays(details) {
    var div_Array = Array.from(document.querySelectorAll(".other-days"));
    for (var i = 1; i < details.length; i++) {
      console.log("x");
      div_Array[i - 1].innerHTML = "";
      var childDiv = document.createElement("div");
      var siblingDiv = document.createElement("div");
      var siblingDiv2 = document.createElement("div");

      childDiv.classList.add("today-components", "weather-icon");
      siblingDiv.classList.add("location-details");
      siblingDiv2.classList.add("weather-stats");
      childDiv.innerHTML = `
      <img
        src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/SVG/1st%20Set%20-%20Color/${details[i].iconName}.svg"
        alt="Weather Icon"
      />
      `;
      siblingDiv.innerHTML = `
      <h3 id="day2-date">${details[i].date.split("-").reverse().join("-")}</h3>
      `;
      siblingDiv2.innerHTML = `
      <h3 id="day1-condition">${details[i].conditions}</h3>
      <h3 id="day1-temp">Temperature:${details[i].temp}F</h3>
      <h3 id="day1-wind">Wind Speed:${details[i].windSpeed}</h3>
      `;
      div_Array[i - 1].appendChild(childDiv);
      div_Array[i - 1].appendChild(siblingDiv);
      div_Array[i - 1].appendChild(siblingDiv2);
    }
  }

  function convertData(json) {
    // console.log(json);
    var otherDays = [],
      temp;

    // icon = json.currentConditions.icon;
    json.days.map((element) => {
      dayName = new Date(element.datetime).toLocaleDateString("en-US", {
        weekday: "long",
      });
      temp = new weatherDetails(
        element.windspeed,
        element.temp,
        json.currentConditions.datetime,
        element.datetime,
        json.resolvedAddress,
        element.conditions,
        element.icon,
        dayName
      );
      otherDays.push(temp);
    });
    renderToday(otherDays[0]);
    renderOtherDays(otherDays);
  }

  async function fetchWeather() {
    getTodayDate();

    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city_name}/${todayDate}/${endDate}?key=${api_token}`
      );
      if (!response.ok) {
        throw new Error("Response Status:" + response.status);
      }

      const json = await response.json();
      console.log(json);

      convertData(json);
    } catch (error) {
      console.log(error.message);
    }
  }

  function getLocation() {
    if ($text_input.value.trim() !== "") {
      city_name = $text_input.value.trim();
      console.log("city Name:" + city_name);
      $text_input.value = "";
      fetchWeather();
    } else {
      console.log("enter valid city name!!");
    }
  }
})();
