const inputCity = document.getElementById("cityInput");
const infoWeather = document.getElementById("weatherInfo");

function getWeather() {
  const city = inputCity.value;

  if (!city) {
    return "City Not Found";
  }

  const API_KEY = "fd2e306e0d4a572819b02b960af9d268"; //api key in here
  const URI = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;;

  fetch(URI) 
    .then(response => response.json())
    .then(data => {
        console.log("Suhu saat ini", data)
        // const infoSuhu = data.main.temp;

        infoWeather.innerHTML = `Data saat ini adalah ${data.main.temp}`
        // infoWeather.innerHTML = `<p class="main">suhu saat ini adalah ${infoSuhu}</p>`
    })
    .catch(error => console.log("Ada yang error", error))

  console.log(URI);
}
