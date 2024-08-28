export const splitOnUppercaseChars = (word: string): string[] =>
  word.split(/(?=[A-Z])/) ?? [];
