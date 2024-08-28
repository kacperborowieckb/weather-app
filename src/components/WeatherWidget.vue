<template>
  <div class="weather-widget">
    <WeatherWidgetPlace :="weatherData.location" />
    <WeatherWidgetCurrentData :="selectedDayData" />
    <WeatherWidgetForecast
      :forecastData="weatherData.forecast"
      :selectedDay="selectedDay"
      @handleDayChange="handleDayChange"
    />
  </div>
</template>

<script setup lang="ts">
import WeatherWidgetPlace from "./WeatherWidgetPlace.vue";
import WeatherWidgetCurrentData from "./WeatherWidgetCurrentData.vue";
import WeatherWidgetForecast from "./WeatherWidgetForecast.vue";
import { computed, ref } from "vue";
import { mockWeatherResponseData } from "../helpers/mockWeatherDataResponse";
import { mapWeatherData } from "../utils.ts/dataMappers";

const selectedDay = ref<number | null>(null);

const weatherData = mapWeatherData(mockWeatherResponseData);

const selectedDayData = computed(() => {
  if (selectedDay.value === null) {
    return weatherData.current;
  }

  return Object.values(weatherData.forecast)[selectedDay.value];
});

const handleDayChange = (newDay: number) => {
  if (newDay === selectedDay.value) {
    selectedDay.value = null;
  } else {
    selectedDay.value = newDay;
  }
};
</script>

<style scoped lang="scss">
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
