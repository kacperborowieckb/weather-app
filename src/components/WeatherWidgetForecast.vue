<template>
  <section class="forecast">
    <WeatherWidgetForecastCard
      v-for="_ in 7"
      :day="'WED'"
      :weather-image="'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png'"
      :temperature="42"
    />
  </section>
</template>

<script setup lang="ts">
import WeatherWidgetForecastCard from "./WeatherWidgetForecastCard.vue";
</script>

<style scoped>
.forecast {
  gap: 2rem;
  display: flex;
  margin: 0 2rem;
}

.forecast > * {
  flex-basis: 100%;
}
</style>
