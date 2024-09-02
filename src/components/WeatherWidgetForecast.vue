<template>
  <section class="forecast">
    <WeatherWidgetForecastCard
      v-for="forecast in props.forecastData"
      :day="getDayPrefix(forecast.date)"
      :weatherImage="getWeatherImageLink(forecast.day.icon)"
      :temperature="
        getAverage(
          forecast.temperature.maximum.value,
          forecast.temperature.minimum.value
        )
      "
      :class="{ active: selectedDay === forecast.date }"
      @click="emit('handleDayChange', forecast.date)"
    />
  </section>
</template>

<script setup lang="ts">
import { getDayPrefix } from "@/helpers/getDayPrefix";
import { getWeatherImageLink } from "@/helpers/getWeatherImageLink";
import { getAverage } from "@/helpers/getAverage";
import { type ForecastItem } from "@/utils/dataMappers";

import WeatherWidgetForecastCard from "./WeatherWidgetForecastCard.vue";

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
