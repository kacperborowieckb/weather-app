<template>
  <div class="weather-widget">
    <div v-if="error">
      <p>Oops! {{ error.message }}</p>
    </div>
    <template v-else-if="data">
      <WeatherWidgetPlace
        :city="'New York'"
        :country="'United States of America'"
      />
      <WeatherWidgetCurrentData
        :temperature="40"
        :weatherIcon="'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png'"
        :weatherDescription="'Sunny weather'"
        :windSpeed="122"
        :pressure="1242"
        :uvIndex="12"
      />
      <WeatherWidgetForecast />
    </template>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import WeatherWidgetPlace from "./WeatherWidgetPlace.vue";
import WeatherWidgetCurrentData from "./WeatherWidgetCurrentData.vue";
import WeatherWidgetForecast from "./WeatherWidgetForecast.vue";
import { useFetch } from "../composables/useFetch";

type MockReturnData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const baseUrl = "https://jsonplaceholder.typicode.com/todos/1";

const { data, error } = useFetch<MockReturnData>(baseUrl);
</script>

<style scoped>
.weather-widget {
  flex-direction: column;
  gap: 3rem;
  display: flex;
  border: 2px solid hsl(203, 51%, 37%);
  border-radius: 16px;
  padding: 2rem;
  min-width: 768px;
  background-color: rgb(22, 50, 67);
}
</style>
