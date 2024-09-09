export const API_URL = import.meta.env.VITE_MOCK
  ? 'http://localhost:3000'
  : 'http://dataservice.accuweather.com';

const mockEndpoints = {
  locationKey: '/locationKey',
  forecast: '/forecast',
  autocomplete: '/autocomplete',
} as const;

const prodEndpoints = {
  locationKey: '/locations/v1/cities/geoposition/search',
  forecast: '/forecasts/v1/daily/5day',
  autocomplete: '/locations/v1/cities/autocomplete',
} as const;

export const ENDPOINTS = import.meta.env.VITE_MOCK
  ? mockEndpoints
  : prodEndpoints;

export const DEFAULT_DEBOUNCE_DELAY = 1000;
