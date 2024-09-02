export const API_URL = import.meta.env.PROD
  ? "http://dataservice.accuweather.com"
  : "http://localhost:3000";

const mockEndpoints = {
  locationKey: "/locationKey",
  forecast: "/forecast",
} as const;

const prodEndpoints = {
  locationKey: "/locations/v1/cities/geoposition/search",
  forecast: "/forecasts/v1/daily/5day",
} as const;

export const endpoints = import.meta.env.PROD ? prodEndpoints : mockEndpoints;
