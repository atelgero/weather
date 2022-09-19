<template>
  <div class="card">
    <p class="country">{{ loc.name }}, {{ loc.country }}</p>
    <div class="temperature-container">
      <img class="weather-icon" :src="details.icon" alt="weather icon">
      <p class="temperature">{{ details.t }}℃</p>
    </div>
    <p class="text">Feels like {{ details.feelsLike }}℃. {{ details.description }}</p>
    <div class="description">
      <table>
        <tr>
          <td><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-cursor-fill" viewBox="0 0 16 16">
  <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
</svg>
            {{ details.windSpeed }}m/s</td>
          <td><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
  <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
  <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
</svg>
            {{ details.pressure }}hPa</td>
        </tr>
        <tr>
          <td>Humidity: {{ details.humidity }}%</td>
          <td>Visibility: {{ details.visibility }}km</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const updateInterval = 30 * 60 * 1000 // take from config

export default {
  name: 'WeatherCard',
  props: {
    loc: {
      name: String,
      country: String,
      lat: Number,
      lon: Number,
    }
  },
  data() {
    return {
      details: {
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=", // empty 1x1px
        t: 0,
        feelsLike: 0,
        description: "",
        windSpeed: 0,
        pressure: 0,
        humidity: 0,
        visibility: 0,
      }
    }
  },
  mounted() {
    this.getWeather(this.loc.lat, this.loc.lon);
    setInterval(this.getWeather, updateInterval, this.loc.lat, this.loc.lon);
  },
  methods: {
    getWeather: function (lat, lon) {
      axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=c2b8fe3a4f8379cd4229b4dc6b646abf&units=metric`)
          .then(response => {
            // noinspection JSUnresolvedVariable
            this.details = {
              icon: 'https://openweathermap.org/img/wn/' + response.data.weather[0].icon + '.png',
              t: Math.round(response.data.main.temp),
              feelsLike: Math.round(response.data.main.feels_like),
              description: response.data.weather[0].description[0].toUpperCase() + response.data.weather[0].description.slice(1),
              windSpeed: response.data.wind.speed,
              pressure: response.data.main.pressure,
              humidity: response.data.main.humidity,
              visibility: response.data.visibility / 1000,
            }
          });
    }
  }
}
</script>

<style scoped>
.card {
  width: 197px;
  height: 259px;
  margin: 0;
  padding: 10px;
  border: 1px solid black;
  background-color: white;
}

.country {
  margin-top: 0.2em;
}

.temperature-container {
  display: flex;
  /*justify-content: center;*/
  align-items: center;
}

.weather-icon {
  width: 50px;
  height: 50px;
  padding: 10px;
}

.temperature {
  padding: 10px 10px 10px 0;
  font-size: 200%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.text {
  font-size: small;
}

.description td {
  font-size: small;
}
</style>