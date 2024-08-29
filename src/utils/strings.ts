export const splitOnUppercaseChars = (word: string): string[] =>
  word.split(/(?=[A-Z])/) ?? [];

export const getListLabel = (label: string) => {
  return splitOnUppercaseChars(label)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
