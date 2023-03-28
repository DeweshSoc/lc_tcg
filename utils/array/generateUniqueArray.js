const getRandomNoInRange = require("../getRandomNoInRange");

/**
 *  generateUniqueArray - generate a string representation of a random array with unique element
 *  @param {number} size - size of array
 *  @param {number} minEle - minimum possible element
 *  @param {number} maxEle - maximum possible element
 *  @param {boolean} sorted - should the array be sorted
 *  @param {boolean} increasingOrder - is the order increasing
 *  @return {string} - string representation of a random array with unique elements
 */
module.exports=generateUniqueArray = (
  size,
  minEle,
  maxEle,
  sorted = false,
  increasingOrder = true
) => {
  console.log(
    `\x1b[35mgenerateUniqueArray() -  \x1b[36mgenerating unique array...\x1b[0m`
  );
  const elements = new Set();
  while (elements.size < size) {
    let rand = getRandomNoInRange(minEle, maxEle);
    elements.add(rand);
  }
  let arr = Array.from(elements);
  arr = sorted
    ? increasingOrder
      ? arr.sort((a, b) => a - b)
      : arr.sort((a, b) => b - a)
    : arr;
  return "[" + arr.join(",") + "]";
};
