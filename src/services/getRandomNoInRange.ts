/**
 * getRandomNoInRange - generate random number in a given range
 * @param {number} min - lower bound of range
 * @param {number} max - upper bound of range
 * @return {number} - a number in range [min,max]
 */
export const getRandomNoInRange = (min:number, max:number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

