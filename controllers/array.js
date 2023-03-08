const express = require("express");

/**
 * Array module
 * @module arrays-controller
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
  console.log(
    `\x1b[42m\x1b[30m\x1b[1mgetRandomArray handler - executing request\x1b[0m`
  );
  const n = Math.floor(Math.random() * (1001 - 0) + 0);
  const newArray = generateArr(n, 1, 1001, 0.5);
  const payload = {
    count: 1,
    size: n,
    arrays: [newArray],
    status: "ok",
    message: "1 array generated",
  };
  res.status(200).json(payload);
  console.log(
    `\x1b[42m\x1b[30m\x1b[1mgetRandomArray handler - response sent\x1b[0m`
  );
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
  console.log(
    `\x1b[42m\x1b[30m\x1b[1mgetCustomArrays handler - executing request\x1b[0m`
  );
  const options = req.body;
  console.table(req.body);
  const noOfArrays = options.count;
  const minEle = options.min;
  const maxEle = options.max;
  const minSizeOfArray = options.minSz;
  const maxSizeOfArray = options.maxSz;
  if (
    isNaN(noOfArrays) ||
    isNaN(minEle) ||
    isNaN(maxEle) ||
    isNaN(minSizeOfArray) ||
    isNaN(maxSizeOfArray)
  ) {
    const err = new Error("Invalid input");
    err.status = 422;
    throw err;
  }
  const uniqueEle = options.unique;
  
  const arrays = [];
  let N = noOfArrays;
  while (N--) {
    let sizeOfArray = randomArrSize(minSizeOfArray, maxSizeOfArray,minEle,maxEle,uniqueEle);
    arrays.push(
      (uniqueEle === true)
      ? generateArrEleUnique(sizeOfArray, minEle, maxEle)
      : generateArr(sizeOfArray, minEle, maxEle)
      );
    }
    const payload = {
      count: noOfArrays,
      size: `[${minSizeOfArray},${maxSizeOfArray}]`,
      arrays: arrays,
      status: "ok",
      message:
      noOfArrays === 1 ? `1 array generated` : `${noOfArrays} arrays generated`,
    };
    res.status(200).json(payload);
    console.log(
      `\x1b[42m\x1b[30m\x1b[1mgetCustomArrays handler - response sent\x1b[0m`
    );
  };
  
  /**
 *
 * randomArrSize - get random array size within given range 
 * @param {number} minSizeOfArray - lower bound of arr.length range
 * @param {number} maxSizeOfArray - upper bound of arr.length range
 * @param {number} minEle - lower bound of arr[i] range
 * @param {number} maxEle - upper bound of arr[i] range
 * @param {boolean} uniqueEle - true if array should contain unique elements
 * @return {number} - returns number denoting random array size 
 */
const randomArrSize = (minSizeOfArray, maxSizeOfArray, minEle, maxEle,uniqueEle) => {
  console.log(
    `\x1b[35mrandomArrSize() - \x1b[36mgenerating random array size...\x1b[0m`
  );
  let sizeOfArray;
  if (uniqueEle) {
    let trial = 10;
    let foundValidArraySize = true;
    do {
      if (!trial--) {
        console.log(
          `\x1b[35mall trials expired : \x1b[36mcould not generate valid array size\x1b[0m`
        );
        foundValidArraySize = false;
        break;
      }
      sizeOfArray = randomNoInRange(minSizeOfArray, maxSizeOfArray);
      console.log(`trying size ${sizeOfArray}...`);
    } while (sizeOfArray > maxEle - minEle + 1);
    if (!foundValidArraySize) {
      const err = new Error(
        "Cannot generate unique elements if arr[i] range is smaller than maximum possible size of arr"
      );
      err.status = 422;
      throw err;
    }
  } else {
    sizeOfArray = randomNoInRange(minSizeOfArray, maxSizeOfArray);
  }
  console.log(
    `\x1b[35mrandomArrSize() - \x1b[36marray size generated :${sizeOfArray}\x1b[0m`
  );
  return sizeOfArray;
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
 *  @return {string} - string representation of a random array with unique elements
 */
const generateArrEleUnique = (size, minEle, maxEle) => {
  console.log(
    `\x1b[35mgenerateArrEleUnique() -  \x1b[36mgenerating unique array...\x1b[0m`);
  const elements = new Set();
  while (elements.size < size) {
    let rand = randomNoInRange(minEle, maxEle);
    elements.add(rand);
  }
  const arr = Array.from(elements).join(",");
  const stringArr = "[" + arr + "]";
  console.log(
    `\x1b[35mgenerateArrEleUnique() - \x1b[36mgenerated array : [${arr.slice(0,20)}...] of size ${elements.size}\x1b[0m`
  );
  return stringArr;
};

/**
 * generateArr - generate a string representation of a random array
 *  @param {number} size - size of array
 *  @param {number} minEle - minimum possible element
 *  @param {number} maxEle - maximum possible element
 *  @return {string} - string representation of a random array
*/
const generateArr = (size, minEle, maxEle) => {
  console.log(`\x1b[35mgenerateArr() -  \x1b[36mgenerating array...\x1b[0m`);
  const elements = [];
  while (size--) {
    let rand = randomNoInRange(minEle, maxEle);
    elements.push(rand);
  }
  const arr = elements.join(',');
  const stringArr = "[" + arr + "]";
  console.log(`\x1b[35mgenerateArr() - \x1b[36mgenerated array : [${arr.slice(0,20)}...] of size ${elements.length}\x1b[0m`);
  return stringArr;
};
