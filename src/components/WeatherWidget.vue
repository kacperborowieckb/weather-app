<template>
  <div class="weather-widget">
    <WeatherWidgetPlace
      v-bind="weatherData.location"
      :date="selectedDayData?.date ?? 'Today'"
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
import { computed, ref } from "vue";

import { mockWeatherResponseData } from "@/mocks/mockWeatherDataResponse";
import { mapWeatherData } from "@/utils/dataMappers";
import { getCurrentDate } from "@/helpers/getCurrentDate";

import WeatherWidgetPlace from "./WeatherWidgetPlace.vue";
import WeatherWidgetCurrentData from "./WeatherWidgetCurrentData.vue";
import WeatherWidgetForecast from "./WeatherWidgetForecast.vue";

const selectedDay = ref<string | null>(getCurrentDate());

const weatherData = computed(() => mapWeatherData(mockWeatherResponseData));

const selectedDayData = computed(() => {
  const currentWeatherData = weatherData.value.forecast.find(
    (currentForecast) => currentForecast.date === selectedDay.value
  );

  return currentWeatherData || weatherData.value.current;
});

const handleDayChange = (newDay: string) => {
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
