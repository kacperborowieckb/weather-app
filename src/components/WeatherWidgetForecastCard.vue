<template>
  <div class="forecast-card">
    <h4 class="forecast-day">{{ props.day }}</h4>
    <div class="forecast-image">
      <img :src="props.weatherImage" :alt="`Weather Image for ${props.day}`" />
    </div>
    <p class="forecast-temperature">{{ props.temperature }}&deg;C</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  day: string;
  weatherImage: string;
  temperature: number;
}>();
</script>

<style scoped>
.forecast-card {
  gap: 1rem;
  flex-direction: column;
  display: flex;
  padding: 0.75rem;
  text-align: center;
}

.forecast-day {
  font-size: 24px;
  font-weight: normal;
}

.forecast-temperature {
  font-weight: bold;
  font-size: 20px;
}
</style>
