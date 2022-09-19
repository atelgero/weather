import Vue from 'vue'
import WeatherWidget from '@/WeatherWidget'

Vue.config.productionTip = false

new Vue({
  render: h => h(WeatherWidget),
}).$mount('weather-widget')
