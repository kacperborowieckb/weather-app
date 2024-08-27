<template>
  <div class="weather-widget">
    <WeatherWidgetPlace
      :city="'New York'"
      :country="'United States of America'"
    />
    <WeatherWidgetCurrentData
      :temperature="40"
      :weatherIcon="'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png'"
      :weatherDescription="'Sunny weather'"
      :windSpeed="122"
      :pressure="1242"
      :uvIndex="12"
    />
    <WeatherWidgetForecast />
  </div>
</template>

<script setup lang="ts">
import WeatherWidgetPlace from "./WeatherWidgetPlace.vue";
import WeatherWidgetCurrentData from "./WeatherWidgetCurrentData.vue";
import WeatherWidgetForecast from "./WeatherWidgetForecast.vue";
</script>

<style scoped>
.weather-widget {
  flex-direction: column;
  gap: 3rem;
  display: flex;
  border: 2px solid hsl(203, 51%, 37%);
  border-radius: 16px;
  padding: 2rem;
  min-width: 768px;
  background-color: rgb(22, 50, 67);
}
</style>
