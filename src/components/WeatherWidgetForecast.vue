<template>
  <section class="forecast">
    <WeatherWidgetForecastCard
      v-for="forecast in props.forecastData"
      :day="getDayPrefix(forecast.date)"
      :weatherImage="getWeatherImageLink(forecast.day.icon)"
      :temperature="forecast.temperature.maximum.value"
      :class="{ active: selectedDay === forecast.date }"
      @click="emit('handleDayChange', forecast.date)"
    />
  </section>
</template>

<script setup lang="ts">
import { getDayPrefix } from "@/helpers/getDayPrefix";
import { type ForecastItem } from "@/utils/dataMappers";

import WeatherWidgetForecastCard from "./WeatherWidgetForecastCard.vue";
import { getWeatherImageLink } from "@/helpers/getWeatherImageLink";

export type ForecastData = ForecastItem[];

const props = defineProps<{
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
