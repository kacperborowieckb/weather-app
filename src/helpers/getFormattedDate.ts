export const getFormattedDate = (date: string = new Date().toString()) => {
  return new Date(date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
