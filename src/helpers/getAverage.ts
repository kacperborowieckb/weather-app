export const getAverage = (...args: number[]) =>
  args.reduce((acc, num) => acc + num, 0) / args.length;
