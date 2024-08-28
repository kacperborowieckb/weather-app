<template>
  <section class="forecast">
    <WeatherWidgetForecastCard
      v-for="(forecast, index) in props.forecastData"
      :day="getDayPrefix(forecast.date)"
      :weather-image="forecast.weatherIcon"
      :temperature="forecast.temperature"
      :class="{ active: selectedDay === index }"
      @click="emit('handleDayChange', index)"
    />
  </section>
</template>

<script setup lang="ts">
import WeatherWidgetForecastCard from "./WeatherWidgetForecastCard.vue";
import { weekDays } from "../helpers/weekDays";
import { type WeatherData } from "./WeatherWidgetCurrentData.vue";

export type ForecastData = (WeatherData & { date: string })[];

const props = defineProps<{
  forecastData: ForecastData;
  selectedDay: number | null;
}>();

const emit = defineEmits(["handleDayChange"]);

const getDayPrefix = (time: string) => weekDays[new Date(time).getDay()];
</script>

<style scoped lang="scss">
.forecast {
  gap: var(--space-xs);
  display: flex;
  margin: 0 var(--m-lg);

  & > * {
    flex-basis: 100%;
  }
}
</style>
