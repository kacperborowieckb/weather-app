<template>
  <div class="weather-widget">
    <WeatherWidgetPlace
      :name="'newYork'"
      :country="'United States of America'"
    />
    <WeatherWidgetCurrentData
      :temperature="mockResponseData.current.temperature"
      :weather_icons="mockResponseData.current.weather_icons"
      :weather_descriptions="mockResponseData.current.weather_descriptions"
      :wind_speed="mockResponseData.current.wind_speed"
      :pressure="mockResponseData.current.pressure"
      :uv_index="mockResponseData.current.uv_index"
    />
    <WeatherWidgetForecast :forecastData="mockResponseData.forecast" />
  </div>
</template>

<script setup lang="ts">
import WeatherWidgetPlace, { type Place } from "./WeatherWidgetPlace.vue";
import WeatherWidgetCurrentData, {
  type WeatherData,
} from "./WeatherWidgetCurrentData.vue";
import WeatherWidgetForecast, {
  type ForecastData,
} from "./WeatherWidgetForecast.vue";

type WeatherAPIResponseData = {
  location: Place;
  current: WeatherData;
  forecast: ForecastData;
};

const mockResponseData: WeatherAPIResponseData = {
  location: {
    name: "New York",
    country: "United States of America",
  },
  current: {
    temperature: 18,
    weather_icons: [
      "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
    ],
    weather_descriptions: ["Sunny"],
    wind_speed: 0,
    pressure: 1011,
    uv_index: 5,
  },
  forecast: {
    "2019-07-07": {
      date: "2019-07-07",
      temperature: 21,
      uv_index: 5,
      wind_speed: 28,
      pressure: 1011,
      weather_icons: [
        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png",
      ],
      weather_descriptions: ["Overcast"],
    },
    "2019-07-08": {
      date: "2019-07-08",
      temperature: 21,
      uv_index: 5,
      wind_speed: 28,
      pressure: 1011,
      weather_icons: [
        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png",
      ],
      weather_descriptions: ["Overcast"],
    },
    "2019-07-09": {
      date: "2019-07-09",
      temperature: 73,
      uv_index: 5,
      wind_speed: 25,
      pressure: 1011,
      weather_icons: [
        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png",
      ],
      weather_descriptions: ["Rainy"],
    },
    "2019-07-10": {
      date: "2019-07-10",
      temperature: 27,
      uv_index: 5,
      wind_speed: 25,
      pressure: 1011,
      weather_icons: [
        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png",
      ],
      weather_descriptions: ["Cloudy"],
    },
    "2019-07-11": {
      date: "2019-07-11",
      temperature: 12,
      uv_index: 8,
      wind_speed: 122,
      pressure: 1011,
      weather_icons: [
        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png",
      ],
      weather_descriptions: ["Rainy"],
    },
    "2019-07-12": {
      date: "2019-07-12",
      temperature: 153,
      uv_index: 25,
      wind_speed: 62,
      pressure: 1011,
      weather_icons: [
        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png",
      ],
      weather_descriptions: ["Sunny"],
    },
  },
};
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
