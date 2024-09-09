<template>
  <div class="weather-widget-dropdown">
    <div class="weather-widget-dropdown__input-wrapper">
      <input
        type="text"
        class="weather-widget-dropdown__input"
        placeholder="Search a place"
        aria-label="Search a place for weather forecast"
        v-model="searchValue"
        @input="handleInputChange"
      />
      <ul class="weather-widget-dropdown__list">
        <WeatherWidgetMessage
          v-if="statusMessages.length"
          :messages="statusMessages"
        />
        <template v-else-if="autocompleteData">
          <li
            v-for="place in autocompleteData"
            :key="place.key"
            class="weather-widget-dropdown__list-item"
            @click="handlePlaceChange(place)"
          >
            {{ `${place.localizedName}, ${place.country}` }}
          </li>
        </template>
      </ul>
    </div>
    <button
      class="weather-widget-dropdown__reset-btn"
      v-if="selectedLocationKey"
      @click="handlePlaceChange(null)"
    >
      Reset
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useFetch } from '@/composables/useFetch';
import { API_URL, ENDPOINTS } from '@/constants';
import {
  type AutocompleteMapperOutput,
  type PlaceInfo,
  mapAutocompleteData,
} from '@/utils/dataMappers';
import { debounce } from '@/utils/debounce';

import WeatherWidgetMessage from './WeatherWidgetMessage.vue';

const searchValue = ref('');

defineProps<{ selectedLocationKey: PlaceInfo | null }>();

const emit = defineEmits<{
  (e: 'handleLocationKeyChange', autocompleteData: PlaceInfo | null): void;
}>();

const {
  data: autocompleteData,
  error: autocompleteError,
  isLoading: isLoadingAutocomplete,
  fetchData: fetchAutocompleteResults,
} = useFetch<AutocompleteMapperOutput>(
  `${API_URL}${ENDPOINTS.autocomplete}`,
  mapAutocompleteData
);

const loadingMessage = computed(() =>
  isLoadingAutocomplete.value ? 'Loading...' : ''
);

const noResultsMessage = computed(() => {
  if (
    !loadingMessage.value &&
    (!autocompleteData.value || autocompleteData.value.length === 0)
  ) {
    return 'No results.';
  }
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
    params: { q: searchValue.value },
  });
};

const handlePlaceChange = (place: PlaceInfo | null) => {
  searchValue.value = place ? `${place.localizedName}, ${place.country}` : '';
  emit('handleLocationKeyChange', place);
};
</script>

<style scoped lang="scss">
.weather-widget-dropdown {
  $dropdown-max-height: 240px;
  $input-width: 160px;

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
    outline: none;
    border-radius: $radius-sm;
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

  &__reset-btn {
    overflow: hidden;
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
    border: $border-primary;
    border-top: none;
    border-color: transparent;
    border-radius: 0 0 $radius-sm $radius-sm;
    background-color: $clr-primary-dark;
    transition: all $transition-duration ease-in-out;
  }

  &__list-item {
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
</style>
