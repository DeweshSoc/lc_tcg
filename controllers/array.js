const express = require('express');

/**
 * Array module
 * @module arrays
 * 
 */


/**
 * getRandomArray - sends an array of string representation of random array as response
 * 
 * @param {express.Request} req - express request object
 * @param {express.Response} res - express response object
 * @param {express.NextFunction} next - express next function
 */
exports.getRandomArray = (req, res, next) => {
  const n = Math.floor(Math.random() * (1001 - 0) + 0);
  const newArray = generateArraySizeN(n, 0.5);
  const payload = {
    count: 1,
    size: n,
    arrays: [newArray],
    status: "ok",
    message: "1 array generated",
  };
  res.status(200).json(payload);
};

/**
 * getCustomArrays - sends an array af string representation of random arrays as response
 *
 * 
 * @param {express.Request} req - express request object
 * @param {express.Response} res - express response object
 * @param {express.NextFunction} next - express next function
 */

exports.getCustomArrays = (req, res, next) => {
  const options = req.body;
  const noOfArrays = +options.count;
  const minEle = +options.min;
  const maxEle = +options.max;
  const negProb = +options.neg;
  const minSizeOfArray = +options.minSz;
  const maxSizeOfArray = +options.maxSz;
  if (
    isNaN(noOfArrays) ||
    isNaN(minEle) ||
    isNaN(maxEle) ||
    isNaN(negProb) ||
    isNaN(minSizeOfArray) ||
    isNaN(maxSizeOfArray)
  ){
    const err = new Error("Invalid input");
    err.status = 422;
    throw err;
  }
  const uniqueEle = options.unique;
  const sizeOfArray = randomNoInRange(minSizeOfArray, maxSizeOfArray);
  const arrays = [];
  let N = noOfArrays;
  while (N--)
    arrays.push(
      uniqueEle == "true"
        ? generateArrEleUnique(sizeOfArray, minEle, maxEle, negProb)
        : generateArr(sizeOfArray, minEle, maxEle, negProb)
    );
  const payload = {
    count: noOfArrays,
    size: `[${minSizeOfArray},${maxSizeOfArray}]`,
    arrays: arrays,
    status: "ok",
    message:
      noOfArrays === 1 ? `1 array generated` : `${noOfArrays} arrays generated`,
  };
  res.status(200).json(payload);
};








/**
 * randomNoInRange - generate random number in a given range
 * @param {number} min - lower bound of range
 * @param {number} max - upper bound of range
 * @return {number} - a number in range [min,max]
 */
const randomNoInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 *  generateArrEleUnique - generate a string representation of a random array with unique element
 *  @param {number} size - size of array
 *  @param {number} minEle - minimum possible element
 *  @param {number} maxEle - maximum possible element
 *  @param {number} negProb - probablity representing frequency of negative numbers
 *  @return {string} - string representation of a random array with unique elements
 */
const generateArrEleUnique = (size, minEle, maxEle, negProb) => {
  const elements = new Set();
  while (elements.size < size) {
    let rand = randomNoInRange(minEle, maxEle);
    rand = Math.random() < negProb ? -rand : rand;
    elements.add(rand);
  }
  const h = "[" + Array.from(elements).join(",") + "]";
  console.log(h);
  return h;
};

/**
 * generateArr - generate a string representation of a random array
 *  @param {number} size - size of array
 *  @param {number} minEle - minimum possible element
 *  @param {number} maxEle - maximum possible element
 *  @param {number} negProb - probablity representing frequency of negative numbers
 *  @return {string} - string representation of a random array
 */
const generateArr = (size, minEle, maxEle, negProb) => {
  const elements = [];
  while (size--) {
    let rand = randomNoInRange(minEle, maxEle);
    rand = Math.random() < negProb ? -rand : rand;
    elements.push(rand);
  }
  const h = "[" + elements.join(",") + "]";
  console.log(h);
  return h;
};
