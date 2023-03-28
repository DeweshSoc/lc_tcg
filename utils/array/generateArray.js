const getRandomNoInRange = require("../getRandomNoInRange");

/**
 * generateArray - generate a string representation of a random array
 *  @param {number} size - size of array
 *  @param {number} minEle - minimum possible element
 *  @param {number} maxEle - maximum possible element
 *  @param {boolean} sorted - should the array be sorted
 *  @param {boolean} increasingOrder - is the order increasing
 *  @return {string} - string representation of a random array
 */
 module.exports = generateArray = (
  size,
  minEle,
  maxEle,
  sorted = false,
  increasingOrder = true
) => {
  console.log(`\x1b[35mgenerateArray() -  \x1b[36mgenerating array...\x1b[0m`);
  let elements = [];
  while (size--) {
    let rand = getRandomNoInRange(minEle, maxEle);
    elements.push(rand);
  }
  elements = sorted
    ? increasingOrder
      ? elements.sort((a, b) => a - b)
      : elements.sort((a, b) => b - a)
    : elements;
  return "[" + elements.join(",") + "]";
};
