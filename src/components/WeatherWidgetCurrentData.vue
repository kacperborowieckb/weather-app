<template>
  <section class="weather-info-wrapper">
    <div class="weather-image-wrapper">
      <img
        class="weather-image"
        :src="props.weatherIcon"
        :alt="`${props.weatherDescription} Weather Image`"
      />
      <p class="weather-description">{{ props.weatherDescription }}</p>
    </div>
    <div class="temperature-wrapper">
      <h3 class="temperature-content">{{ props.temperature }}&deg;C</h3>
    </div>
    <ul class="additional-info">
      <li class="additional-info-item">Wind: {{ props.windSpeed }}</li>
      <li class="additional-info-item">Pressure: {{ props.pressure }}</li>
      <li class="additional-info-item">UV Index: {{ props.uvIndex }}</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
type WeatherInfo = {
  temperature: number;
  weatherIcon: string;
  weatherDescription: string;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
};

const props = defineProps<WeatherInfo>();
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
  display: flex;
}

.weather-image {
  width: 124px;
}

.weather-description {
  font-weight: bold;
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
  list-style: none;
}
</style>
