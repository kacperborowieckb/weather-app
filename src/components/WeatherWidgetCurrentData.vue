<template>
  <section class="weather-info-wrapper">
    <div class="weather-image-wrapper">
      <img
        class="weather-image"
        :src="props.weather_icons[0]"
        :alt="`${props.weather_descriptions[0]} Weather Image`"
      />
      <p class="weather-description">{{ props.weather_descriptions[0] }}</p>
    </div>
    <div class="temperature-wrapper">
      <h3 class="temperature-content">{{ props.temperature }}&deg;C</h3>
    </div>
    <ul class="additional-info">
      <li class="additional-info-item">Wind: {{ props.wind_speed }}</li>
      <li class="additional-info-item">Pressure: {{ props.pressure }}</li>
      <li class="additional-info-item">UV Index: {{ props.uv_index }}</li>
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

<style scoped>
.weather-info-wrapper {
  grid-template-columns: repeat(3, 1fr);
  display: grid;
}

.weather-image-wrapper {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  display: flex;
}

.weather-image {
  width: 124px;
}

.weather-description {
  font-weight: bold;
  font-size: 24px;
}

.temperature-wrapper {
  display: grid;
  place-content: center;
}

.temperature-content {
  font-size: 64px;
}

.additional-info {
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
</style>
