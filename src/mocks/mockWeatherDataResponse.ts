import { WeatherDataMapperInput } from "@/utils/dataMappers";

export const mockWeatherResponseData: WeatherDataMapperInput = {
  DailyForecasts: [
    {
      Date: "2024-09-02T07:00:00+02:00",
      Temperature: {
        Minimum: {
          Value: 58,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 84,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 4,
        IconPhrase: "Intermittent clouds",
      },
      Sources: ["AccuWeather"],
    },
    {
      Date: "2024-09-03T07:00:00+02:00",
      Temperature: {
        Minimum: {
          Value: 59,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 88,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 2,
        IconPhrase: "Mostly sunny",
      },
      Sources: ["AccuWeather"],
    },
    {
      Date: "2024-09-04T07:00:00+02:00",
      Temperature: {
        Minimum: {
          Value: 58,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 86,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 2,
        IconPhrase: "Mostly sunny",
      },
      Sources: ["AccuWeather"],
    },
    {
      Date: "2024-09-05T07:00:00+02:00",
      Temperature: {
        Minimum: {
          Value: 56,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 84,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 3,
        IconPhrase: "Partly sunny",
      },
      Sources: ["AccuWeather"],
    },
    {
      Date: "2024-09-06T07:00:00+02:00",
      Temperature: {
        Minimum: {
          Value: 58,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 82,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 2,
        IconPhrase: "Mostly sunny",
      },
      Sources: ["AccuWeather"],
    },
  ],
};
