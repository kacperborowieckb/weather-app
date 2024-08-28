<template>
  <section class="weather-info">
    <div class="weather-info__image-wrapper">
      <img
        class="weather-info__image"
        :src="props.weatherIcon"
        :alt="`${props.weatherDescription} Weather Image`"
      />
      <p class="weather-info__description">
        {{ props.weatherDescription }}
      </p>
    </div>
    <div class="weather-info__temperature-wrapper">
      <h3 class="weather-info__temperature-info">
        {{ props.temperature }}&deg;C
      </h3>
    </div>
    <ul class="weather-info__additional-info">
      <li
        class="weather-info__additional-info-item"
        v-for="(listItem, key) in sideListData"
      >
        {{ getListLabel(key) }}: {{ listItem }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { splitOnUppercaseChars } from "@/utils/splitOnUppercaseChars";

export type WeatherData = {
  temperature: number;
  weatherIcon: string;
  weatherDescription: string;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  date?: string;
};

const props = defineProps<WeatherData>();

const sideListData = computed(() => {
  const { weatherIcon, weatherDescription, temperature, date, ...listItems } =
    props;

  return listItems;
});

const getListLabel = (label: string): string => {
  return splitOnUppercaseChars(label)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
</script>

<style scoped lang="scss">
.weather-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  &__image-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: $space-sm;
  }

  &__image {
    width: 124px;
  }

  &__description {
    font-size: $fs-lg;
  }

  &__temperature-wrapper {
    display: grid;
    place-content: center;
  }

  &__temperature-info {
    font-size: $fs-3xl;
  }

  &__additional-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $space-xs;
    padding: 0;
    margin: 0 auto;
    width: fit-content;
    font-size: $fs-md;
    list-style: none;
  }
}
</style>
