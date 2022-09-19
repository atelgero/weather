<template>
  <footer>
    <div class="popup" >
      <span class="popuptext" id="myPopup"
            :class="{ show: warn }"
            @click="warn=false">
            location not found</span>
    </div>

    <label for="addCity" class="form-label">Add the city:</label>
    <form class="city" @submit.prevent="addCity">
      <input type="text" id="addCity" placeholder="London" autocomplete="off" v-model="newCity">
      <!--<input type="submit" class="button">-->
      <button type="submit">
        <svg class="trash" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
           viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
        </svg>
      </button>
    </form>
  </footer>
</template>

<script>
import axios from "axios";

export default {
  name: 'NewLocation',
  data() {
    return {
      newCity: "",
      warn: false
    }
  },
  methods: {
    addCity() {
      if (!this.newCity) {
        return
      }

      axios
          .get(`https://api.openweathermap.org/geo/1.0/direct?q==${this.newCity}&APPID=c2b8fe3a4f8379cd4229b4dc6b646abf&limit=1`)
          .then(response => {
            const respData = response.data[0]
            if (!respData) {
              this.warn = true;
              return
            }

            const newLocation = {
              name: respData.name,
              lat: respData.lat,
              lon: respData.lon,
              country: respData.country,
            }

            this.$emit('add-city', newLocation)
            this.newCity = ""
            this.warn = false
          })
          .catch(error => {
            console.log(error);
            this.warn = true;
          });
    },
  }
}
</script>

<style scoped>

footer {
  position: absolute;
  bottom: 0;
  margin-bottom: 10px;
  text-align: left;
}

.city {
  display: flex;
  background-color: #d2d2d2;
  border-radius: 5px;
}

.city input {
  width: 162px;
  border-color: #d2d2d2;
  border-width: 1px;
  border-style: solid;
  /*border-bottom-left-radius: 5px;*/
  /*border-top-left-radius: 5px;*/
}

.city input:focus-visible {
  outline: none;
}

button[type="submit"] {
  padding: 5px;
  margin-left: auto;
  align-self: center;
}

label {
  color: #4a4a4a;
}

/* Popup container */
.popup {
    position: absolute;
    display: inline-block;
    cursor: pointer;
    left: 50%;
}

/* The actual popup (appears on top) */
.popup .popuptext {
    visibility: hidden;
    width: 160px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

/* Toggle this class when clicking on the popup container (hide and show the popup) */
.popup .show {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
}

@keyframes fadeIn {
    from {opacity: 0;}
    to {opacity:1 ;}
}

</style>