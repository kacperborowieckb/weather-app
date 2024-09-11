export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type WeatherDataMapperInput = {
  DailyForecasts: {
    Date: string;
    Temperature: Record<'Minimum' | 'Maximum', { Value: number; Unit: string }>;
    Day: {
      Icon: number;
      IconPhrase: string;
    };
    Sources: string[];
  }[];
};

export type ForecastItem = {
  date: string;
  temperature: {
    minimum: number;
    maximum: number;
    average: number;
    unit: string;
  };
  day: {
    icon: number;
    iconPhrase: string;
  };
  sources: string[];
};

export type ForecastData = ForecastItem[];

export type WeatherDataMapperOutput = {
  dailyForecasts: ForecastItem[];
};

export type LocationKeyMapperInput = {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
};

export type LocationInfo = {
  key: string;
  localizedName: string;
  country: string;
};

export type LocationKeyMapperOutput = LocationInfo;

export type AutocompleteLocationsMapperInput = {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
}[];

export type AutocompleteLocationsMapperOutput = LocationInfo[];
