<template>
  <section class="forecast">
    <WeatherWidgetForecastCard
      v-for="{ day, date, temperature } in forecastData"
      :day="getDayPrefix(date)"
      :weatherImage="getWeatherImageLink(day.icon)"
      :temperature="temperature.average"
      :temperatureUnit="temperature.unit"
      :class="{ active: selectedDay === date }"
      :key="date"
      @click="emit('handleDayChange', date)"
    />
  </section>
</template>

<script setup lang="ts">
import { getDayPrefix } from "@/helpers/getDayPrefix";
import { getWeatherImageLink } from "@/helpers/getWeatherImageLink";
import { type ForecastItem } from "@/utils/dataMappers";

import WeatherWidgetForecastCard from "./WeatherWidgetForecastCard.vue";

export type ForecastData = ForecastItem[];

defineProps<{
  forecastData: ForecastData;
  selectedDay: string | null;
}>();

const emit = defineEmits<{
  (e: "handleDayChange", index: string): void;
}>();
</script>

<style scoped lang="scss">
.forecast {
  display: flex;
  gap: $space-xs;
  margin: 0 $m-lg;

  & > * {
    flex-basis: 100%;
  }
}
</style>
