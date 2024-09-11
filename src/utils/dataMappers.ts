import { getFormattedDate } from '@/helpers/getFormattedDate';
import type {
  AutocompleteLocationsMapperInput,
  AutocompleteLocationsMapperOutput,
  ForecastItem,
  LocationMapperInput,
  LocationMapperOutput,
  WeatherDataMapperInput,
  WeatherDataMapperOutput,
} from '@/types';

export const mapWeatherData = (
  data: WeatherDataMapperInput
): WeatherDataMapperOutput => {
  const dailyForecastsMap: ForecastItem[] = data.DailyForecasts.map(
    (currentForecast) => {
      const temperature = currentForecast.Temperature;

      return {
        date: getFormattedDate(currentForecast.Date),
        temperature: {
          minimum: temperature.Minimum.Value,
          maximum: temperature.Maximum.Value,
          average: (temperature.Minimum.Value + temperature.Maximum.Value) / 2,
          unit: temperature.Minimum.Unit,
        },
        day: {
          icon: currentForecast.Day.Icon,
          iconPhrase: currentForecast.Day.IconPhrase,
        },
        sources: currentForecast.Sources,
      };
    }
  );

  return { dailyForecasts: dailyForecastsMap };
};

export const mapLocationData = (
  data: LocationMapperInput
): LocationMapperOutput => ({
  key: data.Key,
  localizedName: data.LocalizedName,
  country: data.Country.LocalizedName,
});

export const mapAutocompleteLocations = (
  data: AutocompleteLocationsMapperInput
): AutocompleteLocationsMapperOutput => {
  return data.map((city) => ({
    key: city.Key,
    localizedName: city.LocalizedName,
    country: city.Country.LocalizedName,
  }));
};
