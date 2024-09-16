<template>
  <div class="weather-widget-dropdown">
    <div class="weather-widget-dropdown__input-wrapper">
      <input
        v-model="searchValue"
        type="text"
        class="weather-widget-dropdown__input"
        placeholder="Search a location"
        aria-label="Search a location for weather forecast"
        @input="handleInputChange"
      />
      <ul class="weather-widget-dropdown__list">
        <WeatherWidgetMessage
          v-if="statusMessages.length"
          :messages="statusMessages"
        />
        <template v-else-if="autocompleteLocations">
          <li
            v-for="location in autocompleteLocations"
            :key="location.key"
            class="weather-widget-dropdown__list-item"
            @click="handleLocationChange(location)"
          >
            {{ `${location.localizedName}, ${location.country}` }}
          </li>
        </template>
      </ul>
    </div>
    <button
      v-if="selectedLocation"
      class="weather-widget-dropdown__reset-btn"
      @click="handleLocationChange(null)"
    >
      Reset
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useFetch } from '@/composables/useFetch';
import { API_URL, ENDPOINTS } from '@/constants';
import { mapAutocompleteLocations } from '@/utils/dataMappers';
import { debounce } from '@/utils/debounce';
import type { AutocompleteLocationsMapperOutput, LocationInfo } from '@/types';

import WeatherWidgetMessage from './WeatherWidgetMessage.vue';

const searchValue = ref('');

defineProps<{ selectedLocation: LocationInfo | null }>();

const emit = defineEmits<{
  (e: 'locationChange', autocompleteLocations: LocationInfo | null): void;
}>();

const {
  data: autocompleteLocations,
  error: autocompleteError,
  isLoading: isLoadingAutocomplete,
  fetchData: fetchAutocompleteResults,
} = useFetch<AutocompleteLocationsMapperOutput>(
  `${API_URL}${ENDPOINTS.autocomplete}`,
  mapAutocompleteLocations
);

const loadingMessage = computed(() =>
  isLoadingAutocomplete.value ? 'Loading...' : ''
);

const noResultsMessage = computed(() => {
  if (!loadingMessage.value && !autocompleteLocations.value?.length) {
    return 'No results.';
  }

  return ''
});

const statusMessages = computed(() => {
  return [
    loadingMessage.value,
    autocompleteError.value,
    noResultsMessage.value,
  ].filter(Boolean) as (string | Error)[];
});

const debouncedFetchAutocompleteResults = debounce(fetchAutocompleteResults);

const handleInputChange = () => {
  if (!searchValue.value) return;

  debouncedFetchAutocompleteResults('GET', {
    params: { q: searchValue.value.toLowerCase() },
  });
};

const handleLocationChange = (location: LocationInfo | null) => {
  searchValue.value = location
    ? `${location.localizedName}, ${location.country}`
    : '';

  emit('locationChange', location);
};
</script>

<style scoped lang="scss">
$dropdown-max-height: 240px;
$input-width: 160px;

.weather-widget-dropdown {
  display: flex;
  gap: $space-xs;
  margin-left: auto;
  width: min-content;

  &__input-wrapper {
    position: relative;
  }

  &__input,
  &__reset-btn {
    border: $border-primary;
    border-radius: $radius-sm;
    outline: none;
    padding: $p-xs;
    background-color: $clr-primary-dark;
    cursor: pointer;
    color: $clr-text;
    font-size: $fs-sm;
    transition: all $transition-duration ease-out;

    &:hover {
      background-color: $clr-primary-light;
    }
  }

  &__input {
    width: $input-width;

    &::placeholder {
      color: $clr-text;
      text-align: center;
      transition: all $transition-duration ease-out;
    }

    &:focus::placeholder {
      color: $clr-text-muted;
    }

    &:focus,
    &:not(:placeholder-shown) {
      border-radius: $radius-sm $radius-sm 0 0;
      width: $input-width * 2;
      background-color: $clr-primary-light;
      cursor: text;
    }
  }

  &__input-wrapper:active &__input,
  &__input:focus {
    & ~ ul {
      max-height: $dropdown-max-height;
      border-color: $clr-primary-very-light;

      & li {
        opacity: 1;
      }
    }
  }

  &__list {
    position: absolute;
    top: 100%;
    left: 0%;
    width: 100%;
    max-height: 0;
    overflow-y: scroll;
    list-style: none;
    border: 2px solid transparent;
    border-top: none;
    border-radius: 0 0 $radius-sm $radius-sm;
    background-color: $clr-primary-dark;
    transition: all $transition-duration ease-in-out;

    &-item {
      overflow: hidden;
      padding: $p-xs;
      opacity: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: all $transition-duration ease-out;

      &:hover {
        background-color: $clr-primary-light;
        cursor: pointer;
      }
    }
  }
}
</style>
