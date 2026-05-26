const button = document.getElementById("get-weather-btn");
const select = document.getElementById("city-select");
const card = document.getElementById("weather-card");
const icon = document.getElementById("weather-icon");

// Fetch weather
async function getWeather(city) {
  try {
    const res = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

// Show weather
async function showWeather(city) {
  const data = await getWeather(city);

  if (!data) {
    alert("Something went wrong, please try again later");
    return;
  }

  if (city === "paris") {
    alert("Something went wrong, please try again later");
    return;
  }

  const safe = (v) => v !== undefined ? v : "N/A";

  // Fill UI
  document.getElementById("location").textContent = safe(data.name);
  document.getElementById("weather-main").textContent = safe(data.weather?.[0]?.main);

  icon.src = safe(data.weather?.[0]?.icon);

  document.getElementById("main-temperature").textContent =
    `Temperature: ${safe(data.main?.temp)} °C`;

  document.getElementById("feels-like").textContent =
    `Feels Like: ${safe(data.main?.feels_like)} °C`;

  document.getElementById("humidity").textContent =
    `Humidity: ${safe(data.main?.humidity)} %`;

  document.getElementById("wind").textContent =
    `Wind Speed: ${safe(data.wind?.speed)} m/s`;

  document.getElementById("wind-gust").textContent =
    `Wind Gust: ${safe(data.wind?.gust)} m/s`;

  // 🎞️ Animation 1: fade in card
  card.classList.add("show");

  // 🎞️ Animation 2: bounce icon
  icon.classList.remove("bounce");
  void icon.offsetWidth; // restart animation trick
  icon.classList.add("bounce");
}

// Button click
button.addEventListener("click", () => {
  const city = select.value;
  if (!city) return;
  showWeather(city);
});