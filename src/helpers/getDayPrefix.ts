export const weekDays = {
  0: "MON",
  1: "TUE",
  2: "WED",
  3: "THU",
  4: "FRI",
  5: "SAT",
  6: "SUN",
} as const;

export const getDayPrefix = (time: string) =>
  weekDays[new Date(time).getDay() as keyof typeof weekDays];
