<template>
  <div class="start-page">
    <h1>Weather widget v 1.0</h1>
    <em>Always a nice weather:)</em>
    <hr>
    <AddCity @add-city="onAddCity"/>
  </div>
</template>

<script>
import AddCity from "@/components/NewLocation";
import axios from "axios";

export default {
  name: 'StartPage',
  components: {AddCity},
  mounted() {
    navigator.geolocation.getCurrentPosition(this.onAllowPosition);
  },
  methods: {
    onAddCity(newLocation) {
      this.$emit('add-city', newLocation)
    },

    onAllowPosition(position) {
      axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=YourApiKey&units=metric`)
          .then(response => {

            const respData = response.data
            if (!respData) {
              return
            }

            const newLocation = {
              name: respData.name,
              lat: respData.coord.lat,
              lon: respData.coord.lon,
              country: respData.sys.country,
            }

            this.$emit('add-city', newLocation)
          });
    }
  }
}
</script>

<style scoped>
.start-page {
  width: 197px;
  height: 259px;
  margin: 0;
  padding: 10px;
  border: 1px solid black;
  background-color: white;
  text-align: center;
  position: relative;
}

h1 {
  font-size: larger;
  margin-block-end: 0.2em;
}

</style>