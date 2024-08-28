<template>
  <section class="forecast">
    <WeatherWidgetForecastCard
      v-for="(forecast, _, index) in props.forecastData"
      :day="getDayPrefix(forecast.date)"
      :weather-image="forecast.weatherIcon"
      :temperature="forecast.temperature"
      :class="{ active: selectedDay === index }"
      @click="emit('handleDayChange', index)"
    />
  </section>
</template>

<script setup lang="ts">
import { weekDays } from "../helpers/weekDays";
import { type WeatherData } from "./WeatherWidgetCurrentData.vue";
import WeatherWidgetForecastCard from "./WeatherWidgetForecastCard.vue";

export type ForecastData = Record<string, WeatherData & { date: string }>;

const props = defineProps<{
  forecastData: ForecastData;
  selectedDay: number | null;
}>();

const emit = defineEmits(["handleDayChange"]);

const getDayPrefix = (time: string) => weekDays[new Date(time).getDay()];
</script>

<style scoped lang="scss">
.forecast {
  gap: 2rem;
  display: flex;
  margin: 0 2rem;

  & > * {
    flex-basis: 100%;
  }
}
</style>
