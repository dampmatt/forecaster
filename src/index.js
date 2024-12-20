import "./styles.css";

const events = (() => {
  //variable names
  //non html elements
  const api_token = "AKKUHWXN245EQX7F3Z94A5LWV";
  var city_name = "delhi";
  var weather = "";
  var todayDate;
  var endDate;

  //html elements
  const $text_input = document.querySelector("input");
  const $currentDay_placard = document.querySelector("#selected");
  const $otherDays_placard = document.querySelectorAll(".other-days");
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

  function convertData(json) {}

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
