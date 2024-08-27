<template>
  <div class="forecast-card">
    <h4 class="forecast-card__day">{{ props.day }}</h4>
    <div class="forecast-card__image">
      <img :src="props.weatherImage" :alt="`Weather Image for ${props.day}`" />
    </div>
    <p class="forecast-card__temperature">{{ props.temperature }}&deg;C</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  day: string;
  weatherImage: string;
  temperature: number;
}>();
</script>

<style scoped lang="scss">
.forecast-card {
  flex-direction: column;
  gap: 1rem;
  display: flex;
  border-radius: 16px;
  padding: 0.75rem 2rem;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: hsl(203, 51%, 37%);
  }

  & .active {
    background-color: hsl(203, 51%, 27%);
  }

  &__day {
    font-size: 24px;
    font-weight: normal;
  }

  &__temperature {
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
