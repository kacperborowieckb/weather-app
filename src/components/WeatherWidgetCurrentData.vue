<template>
  <section class="weather-info">
    <div class="weather-info__image-wrapper">
      <img
        class="weather-info__image"
        :src="props.weather_icons[0]"
        :alt="`${props.weather_descriptions[0]} Weather Image`"
      />
      <p class="weather-info__description">
        {{ props.weather_descriptions[0] }}
      </p>
    </div>
    <div class="weather-info__temperature-wrapper">
      <h3 class="weather-info__temperature-info">
        {{ props.temperature }}&deg;C
      </h3>
    </div>
    <ul class="weather-info__additional-info">
      <li class="weather-info__additional-info-item">
        Wind: {{ props.wind_speed }}
      </li>
      <li class="weather-info__additional-info-item">
        Pressure: {{ props.pressure }}
      </li>
      <li class="weather-info__additional-info-item">
        UV Index: {{ props.uv_index }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
export type WeatherData = {
  temperature: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  pressure: number;
  uv_index: number;
};

const props = defineProps<WeatherData>();
</script>

<style scoped lang="scss">
.weather-info {
  grid-template-columns: repeat(3, 1fr);
  display: grid;

  &__image-wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    display: flex;
  }

  &__image {
    width: 124px;
  }

  &__description {
    font-weight: bold;
    font-size: 24px;
  }

  &__temperature-wrapper {
    display: grid;
    place-content: center;
  }

  &__temperature-info {
    font-size: 64px;
  }

  &__additional-info {
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0 auto;
    width: fit-content;
    font-weight: bold;
    font-size: 20px;
    list-style: none;
  }
}
</style>
