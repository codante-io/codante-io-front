export const generateRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;
