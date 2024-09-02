<template>
  <div class="weather-widget">
    <WeatherWidgetMessage v-if="geoLocationError" :message="geoLocationError" />
    <template v-else>
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
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

import { mockWeatherResponseData } from "@/mocks/mockWeatherDataResponse";
import { mapWeatherData } from "@/utils/dataMappers";
import { getCurrentDate } from "@/helpers/getCurrentDate";
import { Coordinates, getLocation } from "@/helpers/getLocation";

import WeatherWidgetPlace from "./WeatherWidgetPlace.vue";
import WeatherWidgetCurrentData from "./WeatherWidgetCurrentData.vue";
import WeatherWidgetForecast from "./WeatherWidgetForecast.vue";
import WeatherWidgetMessage from "./WeatherWidgetMessage.vue";

const currentDate = getCurrentDate();

const selectedDay = ref<string>(currentDate);
const coords = ref<Coordinates | null>(null);
const geoLocationError = ref<string | null>(null);

const weatherData = computed(() => mapWeatherData(mockWeatherResponseData));

const selectedDayData = computed(() => {
  const currentWeatherData = weatherData.value.forecast.find(
    (currentForecast) => currentForecast.date === selectedDay.value
  );

  return currentWeatherData || weatherData.value.current;
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
