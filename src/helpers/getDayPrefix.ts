export const getDayPrefix = (time: string) =>
  new Date(time).toLocaleString('en-en', { weekday: 'short' });
