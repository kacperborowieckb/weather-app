export const getFormattedDate = (date: string = new Date().toString()) =>
  new Date(date).toISOString().split("T")[0];
