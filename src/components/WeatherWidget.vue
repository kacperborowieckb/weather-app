<template>
  <div class="weather-widget">
    <WeatherWidgetMessage v-if="geoLocationError" :message="geoLocationError" />
    <template v-else>
      <WeatherWidgetPlace
        v-bind="locationKeyData"
        :date="selectedDayData.date"
      />
      <WeatherWidgetCurrentData v-bind="selectedDayData" />
      <WeatherWidgetForecast
        :forecastData="weatherData.dailyForecasts.slice(1)"
        :selectedDay
        @handleDayChange="handleDayChange"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

import { mockWeatherResponseData } from "@/mocks/mockWeatherDataResponse";
import { mockLocationKeyResponseData } from "@/mocks/mockLocationKeyResponse";
import { mapLocationKeyData, mapWeatherData } from "@/utils/dataMappers";
import { Coordinates, getLocation } from "@/helpers/getLocation";
import { getFormattedDate } from "@/helpers/getFormattedDate";

import WeatherWidgetPlace from "./WeatherWidgetPlace.vue";
import WeatherWidgetCurrentData from "./WeatherWidgetCurrentData.vue";
import WeatherWidgetForecast from "./WeatherWidgetForecast.vue";
import WeatherWidgetMessage from "./WeatherWidgetMessage.vue";
import { endpoints } from "@/constants";

const currentDate = getFormattedDate();

const selectedDay = ref<string>(currentDate);
const coords = ref<Coordinates | null>(null);
const geoLocationError = ref<string | null>(null);

const weatherData = computed(() => mapWeatherData(mockWeatherResponseData));
const locationKeyData = computed(() =>
  mapLocationKeyData(mockLocationKeyResponseData)
);

const selectedDayData = computed(() => {
  const currentWeatherData = weatherData.value.dailyForecasts.find(
    (currentForecast) => currentForecast.date === selectedDay.value
  );

  return currentWeatherData || weatherData.value.dailyForecasts[0];
});

const handleDayChange = (newDay: string) => {
  if (newDay === selectedDay.value) {
    selectedDay.value = currentDate;
  } else {
    selectedDay.value = newDay;
  }
};

onMounted(async () => {
  try {
    coords.value = await getLocation();
    console.log(coords.value.latitude, coords.value.longitude);
  } catch (err) {
    geoLocationError.value = err as string;
  }
});
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
