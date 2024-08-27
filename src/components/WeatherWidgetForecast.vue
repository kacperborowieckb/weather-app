<template>
  <section class="forecast">
    <WeatherWidgetForecastCard
      v-for="(forecast, _, index) in props.forecastData"
      :day="getDayPrefix(forecast.date)"
      :weather-image="forecast.weather_icons[0]"
      :temperature="forecast.temperature"
      :class="{ active: selectedDay === index }"
      @click="emit('handleDayChange', index)"
    />
  </section>
</template>

<script setup lang="ts">
import { type WeatherData } from "./WeatherWidgetCurrentData.vue";
import WeatherWidgetForecastCard from "./WeatherWidgetForecastCard.vue";

export type ForecastData = Record<string, WeatherData & { date: string }>;

const props = defineProps<{
  forecastData: ForecastData;
  selectedDay: number | null;
}>();

const emit = defineEmits(["handleDayChange"]);

const dayPrefixes: Record<number, string> = {
  0: "MON",
  1: "TUE",
  2: "WED",
  3: "THU",
  4: "FRI",
  5: "SAT",
  6: "SUN",
};

const getDayPrefix = (time: string) => dayPrefixes[new Date(time).getDay()];
</script>

<style scoped>
.forecast {
  gap: 2rem;
  display: flex;
  margin: 0 2rem;
}

.forecast > * {
  flex-basis: 100%;
}
</style>
