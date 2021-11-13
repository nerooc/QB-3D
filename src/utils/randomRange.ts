export const randomInRange = (from: number, to: number) =>
  Math.floor(Math.random() * (to - from + 1)) - to;