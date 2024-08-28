import { type WeatherData } from "../components/WeatherWidgetCurrentData.vue";
import { type ForecastData } from "../components/WeatherWidgetForecast.vue";
import { type Place } from "../components/WeatherWidgetPlace.vue";

export const mapWeatherData = (
  data: any
): {
  location: Place;
  current: WeatherData;
  forecast: ForecastData;
} => {
  const forecastMap: ForecastData = {};

  Object.keys(data.forecast).map((currentForecast) => {
    forecastMap[currentForecast] = {
      uvIndex: data.forecast[currentForecast].uv_index,
      weatherDescription:
        data.forecast[currentForecast].weather_descriptions[0],
      weatherIcon: data.forecast[currentForecast].weather_icons[0],
      windSpeed: data.forecast[currentForecast].wind_speed,
      temperature: data.forecast[currentForecast].temperature,
      pressure: data.forecast[currentForecast].pressure,
      date: data.forecast[currentForecast].date,
    };
  });

  return {
    location: data.location,
    current: {
      weatherIcon: data.current.weather_icons[0],
      weatherDescription: data.current.weather_descriptions[0],
      windSpeed: data.current.wind_speed,
      uvIndex: data.current.uv_index,
      temperature: data.current.temperature,
      pressure: data.current.pressure,
    },
    forecast: forecastMap,
  };
};
