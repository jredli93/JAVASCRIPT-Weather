class WeatherAPI {
  constructor() {
    this.apiKey = "9821a7fa8f0692c3d7675bbbe586a80e";
  }

  async getCityData(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    const weatherData = await fetch(url);
    const weather = await weatherData.json();

    return weather;
  }
}

class Display {
  showFeedback(message) {
    const feedback = document.querySelector(".feedback");

    feedback.classList.add("showItem");
    feedback.innerHTML = message;
    setTimeout(() => {
      feedback.classList.remove("showItem");
    }, 3000);
  }

  showWeather(data) {
    console.log(data);

    const results = document.querySelector(".results");
    const cityName = document.getElementById("cityName");
    const cityCountry = document.getElementById("cityCountry");
    const cityTemp = document.getElementById("cityTemp");
    const cityIcon = document.getElementById("cityIcon");
    const cityHumidity = document.getElementById("cityHumidity");

    const {
      name,
      sys: { country },
      main: { temp, humidity }
    } = data;
    const { icon } = data.weather[0];

    results.classList.add("showItem");
    cityName.textContent = name;
    cityCountry.textContent = country;
    cityTemp.textContent = temp;
    cityHumidity.textContent = humidity;
    cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
  }
}

(() => {
  const weather = new WeatherAPI();
  const display = new Display();

  const submitBtn = document.getElementById("wheatherForm");
  submitBtn.addEventListener("submit", event => {
    event.preventDefault();

    const cityInput = document.getElementById("cityInput").value;
    weather.getCityData(cityInput).then(data => {
      if (data.message) {
        display.showFeedback(data.message);
      } else {
        display.showWeather(data);
      }
    });
  });
})();
