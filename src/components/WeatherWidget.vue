<template>
  <div class="weather-widget">
    <WeatherWidgetMessage
      v-if="isLoadingLocationKey || isLoadingWeatherData || geoLocationLoading"
      :message="'Loading...'"
    />
    <WeatherWidgetMessage
      v-else-if="globalError.length"
      :message="globalError"
    />
    <template v-else-if="selectedDayData && weatherData && locationKeyData">
      <WeatherWidgetPlace
        v-bind="locationKeyData"
        :date="selectedDayData.date"
      />
      <WeatherWidgetCurrentData v-bind="selectedDayData" />
      <WeatherWidgetForecast
        :forecastData="weatherData.dailyForecasts"
        :selectedDay
        @handleDayChange="handleDayChange"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

import { mapLocationKeyData, mapWeatherData } from "@/utils/dataMappers";
import { Coordinates, getLocation } from "@/helpers/getLocation";
import { getFormattedDate } from "@/helpers/getFormattedDate";
import { useFetch } from "@/composables/useFetch";
import { API_URL, endpoints } from "@/constants";

import WeatherWidgetPlace from "./WeatherWidgetPlace.vue";
import WeatherWidgetCurrentData from "./WeatherWidgetCurrentData.vue";
import WeatherWidgetForecast from "./WeatherWidgetForecast.vue";
import WeatherWidgetMessage from "./WeatherWidgetMessage.vue";

const currentDate = getFormattedDate();

const selectedDay = ref<string>(currentDate);
const coords = ref<Coordinates | null>(null);
const geoLocationLoading = ref<boolean>(false);
const geoLocationError = ref<string | null>(null);

const {
  data: locationKeyData,
  error: locationKeyError,
  isLoading: isLoadingLocationKey,
  fetchData: fetchLocationKey,
} = useFetch(`${API_URL}${endpoints.locationKey}`, mapLocationKeyData);

const {
  data: weatherData,
  error: weatherError,
  isLoading: isLoadingWeatherData,
  fetchData: fetchWeatherData,
} = useFetch("", mapWeatherData);

const globalError = computed(() => {
  return [geoLocationError, locationKeyError, weatherError]
    .map((err) => err.value)
    .filter(Boolean) as (string | Error)[];
});

const selectedDayData = computed(() => {
  const currentWeatherData = weatherData.value?.dailyForecasts.find(
    (currentForecast) => currentForecast.date === selectedDay.value
  );

  return currentWeatherData || weatherData.value?.dailyForecasts[0];
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
    geoLocationLoading.value = true;

    coords.value = await getLocation();
  } catch (err) {
    geoLocationError.value = err as string;
  } finally {
    geoLocationLoading.value = false;
  }

  if (geoLocationError.value) return;

  await fetchLocationKey("GET", {
    params: { q: `${coords.value?.latitude},${coords.value?.longitude}` },
  });
  await fetchWeatherData("GET", {
    url: `${API_URL}${endpoints.forecast}/${locationKeyData.value?.key}`,
  });
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
