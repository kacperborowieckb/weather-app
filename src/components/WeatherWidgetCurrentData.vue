<template>
  <section class="weather-info">
    <div class="weather-info__image-wrapper">
      <img
        class="weather-info__image"
        :src="imageLink"
        :alt="`${day.iconPhrase}`"
      />
      <p class="weather-info__description">
        {{ day.iconPhrase }}
      </p>
    </div>
    <div class="weather-info__temperature-wrapper">
      <h3 class="weather-info__temperature-info">
        {{ temperature.average }}&deg;{{ temperature.unit }}
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
import { computed } from 'vue';

import { getListLabel } from '@/utils/strings';
import { getWeatherImageLink } from '@/helpers/getWeatherImageLink';
import { type ForecastItem } from '@/utils/dataMappers';

const props = defineProps<ForecastItem>();

const sideListData = computed(() => ({
  minTemperature: props.temperature.minimum,
  maxTemperature: props.temperature.maximum,
  source: props.sources[0],
}));

const imageLink = computed(() => getWeatherImageLink(props.day.icon));
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
