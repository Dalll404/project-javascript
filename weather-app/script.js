const form = document.getElementById("weatherForm");
const inputCity = document.getElementById("cityInput");
const infoWeather = document.getElementById("weatherInfo");
const weatherMessage = document.getElementById("weatherMessage");
const submitButton = form.querySelector("button");

form.addEventListener("submit", getWeather);

async function getWeather(event) {
  event.preventDefault();

  const city = inputCity.value.trim();
  if (!city) {
    weatherMessage.dataset.state = "error";
    weatherMessage.textContent = "Masukkan nama kota terlebih dahulu.";
    inputCity.focus();
    return;
  }

  const API_KEY = "fd2e306e0d4a572819b02b960af9d268";
  const URI = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  infoWeather.replaceChildren();
  weatherMessage.dataset.state = "loading";
  weatherMessage.textContent = "Sedang mencari cuaca...";
  submitButton.disabled = true;

  try {
    const response = await fetch(URI);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Kota tidak ditemukan. Periksa ejaan nama kota.");
      }
      if (response.status === 401) {
        throw new Error("Layanan cuaca sedang tidak tersedia. Coba lagi nanti.");
      }
      throw new Error(data.message || "Cuaca belum bisa dimuat. Coba lagi sebentar.");
    }

    if (!data.main || !data.weather?.[0]) {
      throw new Error("Data cuaca kota ini belum tersedia.");
    }

    renderWeather(data);
    weatherMessage.dataset.state = "success";
    weatherMessage.textContent = `Cuaca terkini untuk ${data.name}.`;
  } catch (error) {
    weatherMessage.dataset.state = "error";
    weatherMessage.textContent = error instanceof TypeError
      ? "Tidak dapat terhubung. Periksa koneksi internet lalu coba lagi."
      : error.message;
  } finally {
    submitButton.disabled = false;
  }
}

function renderWeather(data) {
  const condition = data.weather[0];
  const main = data.main;
  const cityName = data.name + (data.sys?.country ? `, ${data.sys.country}` : "");
  const description = condition.description || condition.main || "Cuaca terkini";
  const iconCode = /^[0-9]{2}[dn]$/.test(condition.icon || "") ? condition.icon : null;

  const card = document.createElement("article");
  card.className = "weather-card";

  const mainSection = document.createElement("div");
  mainSection.className = "weather-main";

  const location = document.createElement("div");
  const locationLabel = document.createElement("p");
  locationLabel.className = "location-label";
  locationLabel.textContent = "Kondisi saat ini";

  const name = document.createElement("h2");
  name.className = "location-name";
  name.textContent = cityName;

  const weatherDescription = document.createElement("p");
  weatherDescription.className = "weather-description";
  weatherDescription.textContent = description;
  location.append(locationLabel, name, weatherDescription);

  const temperatureWrap = document.createElement("div");
  temperatureWrap.className = "temperature-wrap";
  if (iconCode) {
    const icon = document.createElement("img");
    icon.className = "weather-icon";
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
    temperatureWrap.append(icon);
  }

  const temperature = document.createElement("span");
  temperature.className = "temperature";
  temperature.textContent = `${Math.round(main.temp)}`;

  const unit = document.createElement("span");
  unit.className = "temperature-unit";
  unit.textContent = "°C";
  temperatureWrap.append(temperature, unit);
  mainSection.append(location, temperatureWrap);

  const details = document.createElement("div");
  details.className = "weather-details";
  details.append(
    createDetail("Terasa seperti", `${Math.round(main.feels_like)}°`),
    createDetail("Kelembapan", `${main.humidity}%`),
    createDetail("Angin", `${Math.round(data.wind?.speed ?? 0)} m/s`)
  );

  card.append(mainSection, details);
  infoWeather.replaceChildren(card);
}

function createDetail(label, value) {
  const detail = document.createElement("div");
  detail.className = "detail";

  const detailLabel = document.createElement("span");
  detailLabel.className = "detail-label";
  detailLabel.textContent = label;

  const detailValue = document.createElement("span");
  detailValue.className = "detail-value";
  detailValue.textContent = value;

  detail.append(detailLabel, detailValue);
  return detail;
}
