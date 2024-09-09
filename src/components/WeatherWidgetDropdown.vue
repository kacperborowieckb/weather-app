<template>
  <div class="dropdown">
    <input
      type="text"
      class="dropdown__input"
      placeholder="Search a place"
      aria-label="Search a place for weather forecast"
      v-model="searchValue"
      @input="handleInputChange"
    />
    <ul class="dropdown__list">
      <WeatherWidgetMessage
        v-if="shouldDisplayStatusMessages"
        :messages="statusMessages"
      />
      <template v-else-if="autocompleteData">
        <li
          v-for="place in autocompleteData"
          class="dropdown__list-item"
          @click="() => handlePlaceChange(place)"
        >
          {{ `${place.localizedName}, ${place.country}` }}
        </li>
      </template>
      <p v-else class="dropdown__list-message">No results.</p>
    </ul>
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

const {
  data: autocompleteData,
  error: autocompleteError,
  isLoading: isLoadingAutocomplete,
  fetchData: fetchAutocompleteResults,
} = useFetch<AutocompleteMapperOutput>(
  `${API_URL}${ENDPOINTS.autocomplete}`,
  mapAutocompleteData
);

const emit = defineEmits<{
  (e: 'handleLocationKeyChange', autocompleteData: PlaceInfo): void;
}>();

const shouldDisplayStatusMessages = computed(() => {
  return (
    (autocompleteData.value === null && isLoadingAutocomplete.value) ||
    autocompleteError.value
  );
});

const statusMessages = computed(() => {
  return [
    isLoadingAutocomplete.value && 'Loading...',
    autocompleteError.value,
  ].filter(Boolean) as (string | Error)[];
});

const debouncedFetchAutocompleteResults = debounce(fetchAutocompleteResults);

const handleInputChange = () => {
  if (!searchValue.value) return;

  debouncedFetchAutocompleteResults('GET', {
    params: { q: searchValue.value },
  });
};

const handlePlaceChange = (place: PlaceInfo) => {
  searchValue.value = `${place.localizedName}, ${place.country}`;
  emit('handleLocationKeyChange', place);
};
</script>

<style scoped lang="scss">
.dropdown {
  $dropdown-max-height: 240px;
  $input-width: 160px;

  position: relative;
  width: min-content;
  margin-left: auto;

  &__input {
    border: $border-primary;
    outline: none;
    border-radius: $radius-sm;
    padding: $p-xs;
    width: $input-width;
    background-color: $clr-primary-dark;
    cursor: pointer;
    color: $clr-text;
    font-size: $fs-sm;
    transition: all $transition-duration ease-out;

    &:hover {
      background-color: $clr-primary-light;
    }

    &:focus,
    &:not(:placeholder-shown) {
      border-radius: $radius-sm $radius-sm 0 0;
      width: $input-width * 2;
      background-color: $clr-primary-light;
      cursor: text;
    }

    &:focus::placeholder {
      color: $clr-text-muted;
    }

    &:focus ~ ul {
      max-height: $dropdown-max-height;
      border-color: $clr-primary-very-light;

      & li {
        opacity: 1;
      }
    }

    &::placeholder {
      color: $clr-text;
      text-align: center;
      transition: all $transition-duration ease-out;
    }
  }

  &__list {
    position: absolute;
    top: 100%;
    left: 0%;
    width: 100%;
    max-height: 0;
    overflow-x: scroll;
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

  &__list-message {
    padding: $p-xs;
    text-align: center;
  }
}
</style>
