<template>
  <div class="weather-widget">
    <WeatherWidgetDropdown
      :selectedLocation
      @locationChange="handleLocationChange"
    />
    <div class="weather-widget__content">
      <WeatherWidgetMessage
        v-if="statusMessages.length"
        :messages="statusMessages"
      />
      <template
        v-else-if="selectedDayData && weatherData && currentLocationData"
      >
        <WeatherWidgetLocation
          :locationInfo="[
            currentLocationData.localizedName,
            currentLocationData.country,
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';

import {
  type LocationKeyMapperOutput,
  type WeatherDataMapperOutput,
  type LocationInfo,
  mapLocationKeyData,
  mapWeatherData,
} from '@/utils/dataMappers';
import { type Coordinates, getLocation } from '@/helpers/getLocation';
import { getFormattedDate } from '@/helpers/getFormattedDate';
import { useFetch } from '@/composables/useFetch';
import { API_URL, ENDPOINTS } from '@/constants';

import WeatherWidgetLocation from './WeatherWidgetLocation.vue';
import WeatherWidgetCurrentData from './WeatherWidgetCurrentData.vue';
import WeatherWidgetForecast from './WeatherWidgetForecast.vue';
import WeatherWidgetMessage from './WeatherWidgetMessage.vue';
import WeatherWidgetDropdown from './WeatherWidgetDropdown.vue';

const currentDate = getFormattedDate();

const selectedDay = ref<string>(currentDate);
const coords = ref<Coordinates | null>(null);
const isLoadingGeolocation = ref<boolean>(false);
const geoLocationError = ref<string | null>(null);
const selectedLocation = ref<LocationInfo | null>(null);

const {
  data: location,
  error: locationKeyError,
  isLoading: isLoadingLocationKey,
  fetchData: fetchLocationKey,
} = useFetch<LocationKeyMapperOutput>(
  `${API_URL}${ENDPOINTS.locationKey}`,
  mapLocationKeyData
);

const {
  data: weatherData,
  error: weatherError,
  isLoading: isLoadingWeatherData,
  fetchData: fetchWeatherData,
} = useFetch<WeatherDataMapperOutput>(
  `${API_URL}${ENDPOINTS.forecast}`,
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

const currentLocationData = computed(
  () => selectedLocation.value || location.value
);

watch(currentLocationData, () => {
  const locationKeyEndpoint = import.meta.env.VITE_MOCK
    ? ''
    : `/${currentLocationData.value?.key}`;

  fetchWeatherData('GET', {
    url: `${locationKeyEndpoint}`,
  });
});

const handleDayChange = (newDay: string) => {
  if (newDay === selectedDay.value) {
    selectedDay.value = currentDate;
  } else {
    selectedDay.value = newDay;
  }
};

const handleLocationChange = (locationKey: LocationInfo | null) => {
  selectedLocation.value = locationKey;
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

  fetchLocationKey('GET', {
    params: { q: `${coords.value?.latitude},${coords.value?.longitude}` },
  });
});
</script>

<style scoped lang="scss">
.weather-widget {
  display: flex;
  flex-direction: column;
  gap: $space-xl;

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-xl;
    border: $border-primary;
    border-radius: $radius-md;
    padding: $p-lg;
    min-width: 768px;
    background-color: $clr-primary-dark;
  }
}
</style>
