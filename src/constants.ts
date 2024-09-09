export const API_URL = import.meta.env.VITE_MOCK
  ? 'http://localhost:3000'
  : 'http://dataservice.accuweather.com';

const mockEndpoints = {
  locationKey: '/locationKey',
  forecast: '/forecast',
} as const;

const prodEndpoints = {
  locationKey: '/locations/v1/cities/geoposition/search',
  forecast: '/forecasts/v1/daily/5day',
} as const;

export const endpoints = import.meta.env.VITE_MOCK
  ? mockEndpoints
  : prodEndpoints;
