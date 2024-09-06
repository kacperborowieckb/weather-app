<template>
  <div class="forecast-card">
    <h4 class="forecast-card__day">
      {{ day }}
    </h4>
    <div class="forecast-card__image">
      <img 
        :src="weatherImage" 
        :alt="`Weather Image for ${day}`" 
      />
    </div>
    <p class="forecast-card__temperature">
      {{ temperature }}&deg;{{ temperatureUnit }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  day: string;
  weatherImage: string;
  temperature: number;
  temperatureUnit: string;
}>();
</script>

<style scoped lang="scss">
.forecast-card {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  border-radius: $radius-md;
  padding: $p-sm $p-lg;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: $clr-primary-very-light;
  }

  &.active {
    background-color: $clr-primary-light;
  }

  &__day {
    font-size: $fs-lg;
    font-weight: 300;
  }

  &__temperature {
    font-size: $fs-md;
  }
}
</style>
