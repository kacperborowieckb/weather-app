import { WeatherData } from "@/components/WeatherWidgetCurrentData.vue";
import { ForecastData } from "@/components/WeatherWidgetForecast.vue";
import { Place } from "@/components/WeatherWidgetPlace.vue";

type WeatherDataResponse = {
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  uv_index: number;
  temperature: number;
  pressure: number;
};

type WeatherDataMapperInput = {
  location: Place;
  current: WeatherDataResponse;
  forecast: Record<string, WeatherDataResponse & { date: string }>;
};

export type WeatherDataMapperOutput = {
  location: Place;
  current: WeatherData;
  forecast: ForecastData;
};

export const mapWeatherData = (
  data: WeatherDataMapperInput
): WeatherDataMapperOutput => {
  const forecastMap: ForecastData = Object.keys(data.forecast).map(
    (currentForecast) => {
      const forecastData = data.forecast[currentForecast];

      return {
        uvIndex: forecastData.uv_index,
        weatherDescription: forecastData.weather_descriptions[0],
        weatherIcon: forecastData.weather_icons[0],
        windSpeed: forecastData.wind_speed,
        temperature: forecastData.temperature,
        pressure: forecastData.pressure,
        date: forecastData.date,
      };
    }
  );

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
