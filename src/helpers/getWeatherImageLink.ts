export const getWeatherImageLink = (iconNumber: number) => {
  const imageNumber = iconNumber.toString().padStart(2, "0");

  return `https://developer.accuweather.com/sites/default/files/${imageNumber}-s.png`;
};
