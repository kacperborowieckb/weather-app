import { getFormattedDate } from "@/helpers/getFormattedDate";

export type WeatherDataMapperInput = {
  DailyForecasts: {
    Date: string;
    Temperature: Record<"Minimum" | "Maximum", { Value: number; Unit: string }>;
    Day: {
      Icon: number;
      IconPhrase: string;
    };
    Sources: string[];
  }[];
};

export type ForecastItem = {
  date: string;
  temperature: Record<"minimum" | "maximum", { value: number; unit: string }>;
  day: {
    icon: number;
    iconPhrase: string;
  };
  sources: string[];
};

export type WeatherDataMapperOutput = {
  dailyForecasts: ForecastItem[];
};

export const mapWeatherData = (
  data: WeatherDataMapperInput
): WeatherDataMapperOutput => {
  const dailyForecastsMap: ForecastItem[] = data.DailyForecasts.map(
    (currentForecast) => {
      const temperature = currentForecast.Temperature;

      return {
        date: getFormattedDate(currentForecast.Date),
        temperature: {
          minimum: {
            value: temperature.Minimum.Value,
            unit: temperature.Maximum.Unit,
          },
          maximum: {
            value: temperature.Maximum.Value,
            unit: temperature.Maximum.Unit,
          },
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

type LocationKeyMapperInput = {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
};

type LocationKeyMapperOutput = {
  key: string;
  localizedName: string;
  country: string;
};

export const mapLocationKeyData = (
  data: LocationKeyMapperInput
): LocationKeyMapperOutput => ({
  key: data.Key,
  localizedName: data.LocalizedName,
  country: data.Country.LocalizedName,
});
