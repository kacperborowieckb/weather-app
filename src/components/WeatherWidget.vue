<template>
  <div class="weather-widget">
    <WeatherWidgetPlace
      v-bind="weatherData.location"
      :date="selectedDayData.date ?? 'Today'"
    />
    <WeatherWidgetCurrentData v-bind="selectedDayData" />
    <WeatherWidgetForecast
      :forecastData="weatherData.forecast"
      :selectedDay
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

const weatherData = computed(() => mapWeatherData(mockWeatherResponseData));

const selectedDayData = computed(() => {
  if (selectedDay.value === null) {
    return weatherData.value.current;
  }

  return weatherData.value.forecast[selectedDay.value];
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
  display: flex;
  flex-direction: column;
  gap: $space-xl;
  border: $border-primary;
  border-radius: $radius-md;
  padding: $p-lg;
  min-width: 768px;
  background-color: $clr-primary-dark;
}
</style>
