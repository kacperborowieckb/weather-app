<template>
  <div class="weather-widget">
    <WeatherWidgetMessage
      v-if="statusMessages.length"
      :messages="statusMessages"
    />
    <template v-else-if="selectedDayData && weatherData && locationKeyData">
      <WeatherWidgetPlace
        :placeInfo="[
          locationKeyData.localizedName,
          locationKeyData.country,
          selectedDayData.date,
        ]"
      />
      <WeatherWidgetCurrentData v-bind="selectedDayData" />
      <WeatherWidgetForecast
        :forecastData="weatherData.dailyForecasts"
        :selectedDay
        @handleDayChange="handleDayChange"
      />
    </template>
    <p v-else>Something bad happened. Please refresh the page</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

import {
  type LocationKeyMapperOutput,
  type WeatherDataMapperOutput,
  mapLocationKeyData,
  mapWeatherData,
} from '@/utils/dataMappers';
import { type Coordinates, getLocation } from '@/helpers/getLocation';
import { getFormattedDate } from '@/helpers/getFormattedDate';
import { useFetch } from '@/composables/useFetch';
import { API_URL, endpoints } from '@/constants';

import WeatherWidgetPlace from './WeatherWidgetPlace.vue';
import WeatherWidgetCurrentData from './WeatherWidgetCurrentData.vue';
import WeatherWidgetForecast from './WeatherWidgetForecast.vue';
import WeatherWidgetMessage from './WeatherWidgetMessage.vue';

const currentDate = getFormattedDate();

const selectedDay = ref<string>(currentDate);
const coords = ref<Coordinates | null>(null);
const isLoadingGeolocation = ref<boolean>(false);
const geoLocationError = ref<string | null>(null);

const {
  data: locationKeyData,
  error: locationKeyError,
  isLoading: isLoadingLocationKey,
  fetchData: fetchLocationKey,
} = useFetch<LocationKeyMapperOutput>(
  `${API_URL}${endpoints.locationKey}`,
  mapLocationKeyData
);

const {
  data: weatherData,
  error: weatherError,
  isLoading: isLoadingWeatherData,
  fetchData: fetchWeatherData,
} = useFetch<WeatherDataMapperOutput>(
  `${API_URL}${endpoints.forecast}`,
  mapWeatherData
);

const isLoading = computed(() =>
  [isLoadingLocationKey, isLoadingWeatherData, isLoadingGeolocation].some(
    (loading) => loading.value
  )
);

const globalErrors = computed(() => {
  return [geoLocationError, locationKeyError, weatherError]
    .map((err) => err.value)
    .filter(Boolean) as (string | Error)[];
});

const statusMessages = computed(() => {
  return isLoading.value
    ? ['Loading...', ...globalErrors.value]
    : globalErrors.value;
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
    isLoadingGeolocation.value = true;

    coords.value = await getLocation();
  } catch (err) {
    geoLocationError.value = err as string;
  } finally {
    isLoadingGeolocation.value = false;
  }

  if (geoLocationError.value) return;

  await fetchLocationKey('GET', {
    params: { q: `${coords.value?.latitude},${coords.value?.longitude}` },
  });

  const locationKeyEndpoint = import.meta.env.VITE_MOCK
    ? ''
    : `/${locationKeyData.value?.key}`;

  await fetchWeatherData('GET', {
    url: `${locationKeyEndpoint}`,
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
