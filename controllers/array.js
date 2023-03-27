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
  const newArray = generateArr(n, 1, 1001);
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
  console.table(req.body);
  const { count, minSz, maxSz, minEle, maxEle, uniqueEle } = req.body;
  if (isArrayReqInvalid(req.body)) {
    const err = new Error("Invalid input for the requested endpoint");
    err.status = 422;
    throw err;
  }
  const arrays = [];
  let N = count;
  while (N--) {
    let sizeOfArray = randomArrSize(minSz, maxSz, minEle, maxEle, uniqueEle);
    arrays.push(
      uniqueEle === true
        ? generateArrEleUnique(sizeOfArray, minEle, maxEle)
        : generateArr(sizeOfArray, minEle, maxEle)
    );
  }
  const payload = {
    count: count,
    size: `[${minSz},${maxSz}]`,
    arrays: arrays,
    status: "ok",
    message: count === 1 ? `1 array generated` : `${count} arrays generated`,
  };
  res.status(200).json(payload);
  console.log(
    `\x1b[42m\x1b[30m\x1b[1mgetCustomArrays handler - response sent\x1b[0m`
  );
};

/**
 * getCustomSortedArray - sends an array af string representation of random sorted array as response
 *
 *
 * @param {express.Request} req - express request object
 * @param {express.Response} res - express response object
 * @param {express.NextFunction} next - express next function
 */
exports.getCustomSortedArray = (req, res, next) => {
  console.log(
    `\x1b[42m\x1b[30m\x1b[1mgetCustomSortedArrays handler - executing request\x1b[0m`
  );
  console.table(req.body);
  const { minSz, maxSz, minEle, maxEle, strictOrder, increasingOrder } =
    req.body;
  if (isSortedArrayReqInvalid(req.body)) {
    const err = new Error("Invalid input");
    err.status = 422;
    throw err;
  }
  let sizeOfArray = randomArrSize(minSz, maxSz, minEle, maxEle, strictOrder);
  const array = strictOrder === true
    ? generateArrEleUnique(sizeOfArray, minEle, maxEle, true,increasingOrder)
    : generateArr(sizeOfArray, minEle, maxEle, true,increasingOrder);
  const payload = {
    count: 1,
    size: `[${minSz},${maxSz}]`,
    arrays: [array],
    status: "ok",
    message: `1 array generated`
  };
  res.status(200).json(payload);
  console.log(
    `\x1b[42m\x1b[30m\x1b[1mgetCustomSortedArray handler - response sent\x1b[0m`
  );
};


/**
 *  isSortedArrayReqInvalid - checks if req.body object is invalid
 *
 * @param {express.Request.body} body - JS object obtained after parsing json request body attached by user
 * @return {boolean} - returns true if body is invalid
 */
const isSortedArrayReqInvalid = (body)=>{
  console.log(
    `\x1b[35misSortedArrayReqInvalid() - \x1b[36mvalidating request body...\x1b[0m`
  );
   const { minSz, maxSz, minEle, maxEle, strictOrder, increasingOrder } = body;
   const areTypeOK =
     typeof minSz === "number" &&
     typeof maxSz === "number" &&
     typeof minEle === "number" &&
     typeof maxEle === "number" &&
     typeof strictOrder === "boolean" &&
     typeof increasingOrder === "boolean";
   const areValuesValid =
      minSz && maxSz && minEle && maxEle && strictOrder !== undefined && increasingOrder!==undefined;
   const areValuesInRange =
     minSz > 0 &&
     maxSz <= 100000 &&
     minSz <= maxSz &&
     minEle >= -1000000000 &&
     maxEle <= 1000000000 &&
     minEle <= maxEle;
   return !(areTypeOK && areValuesValid && areValuesInRange);
}

/**
 *  isReqInvalid - checks if req.body object is invalid
 *
 * @param {express.Request.body} body - JS object obtained after parsing json request body attached by user
 * @return {boolean} - returns true if body is invalid
 */
const isArrayReqInvalid = (body) => {
  console.log(
    `\x1b[35misArrayReqInvalid() - \x1b[36mvalidating request body...\x1b[0m`
  );
  const { count, minSz, maxSz, minEle, maxEle, uniqueEle } = body;
  const areTypeOK =
    typeof count === "number" &&
    typeof minSz === "number" &&
    typeof maxSz === "number" &&
    typeof minEle === "number" &&
    typeof maxEle === "number" &&
    typeof uniqueEle === "boolean";
  const areValuesValid =
    count && minSz && maxSz && minEle && maxEle && uniqueEle != undefined;
  const areValuesInRange =
    count <= 5 &&
    minSz > 0 &&
    maxSz <= 100000 &&
    minSz <= maxSz &&
    minEle >= -1000000000 &&
    maxEle <= 1000000000 &&
    minEle <= maxEle;
  return !(areTypeOK && areValuesValid && areValuesInRange);
};

/**
 *
 * randomArrSize - get random array size within given range
 * @param {number} minSz - lower bound of arr.length range
 * @param {number} maxSz - upper bound of arr.length range
 * @param {number} minEle - lower bound of arr[i] range
 * @param {number} maxEle - upper bound of arr[i] range
 * @param {boolean} uniqueEle - true if array should contain unique elements
 * @return {number} - returns number denoting random array size
 */
const randomArrSize = (minSz, maxSz, minEle, maxEle, uniqueEle) => {
  console.log(
    `\x1b[35mrandomArrSize() - \x1b[36mgenerating random array size...\x1b[0m`
  );
  let sizeOfArray = randomNoInRange(minSz, maxSz);
  if (uniqueEle) {
    let trial = 10;
    console.log(`trying size ${sizeOfArray}...`);
    while (sizeOfArray > maxEle - minEle + 1 && trial--) {
      sizeOfArray = randomNoInRange(minSz, maxSz);
      console.log(`trying size ${sizeOfArray}...`);
    }
    if (trial <= 0) {
      console.log(`\x1b[35mrandomArrSize - \x1b[36mall trials expired\x1b[0m`);
      const err = new Error(
        `arr[i] range is smaller than maximum possible size of arr`
      );
      err.status = 422;
      throw err;
    }
  }
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
 *  @param {boolean} sorted - should the array be sorted
 *  @param {boolean} increasingOrder - is the order increasing
 *  @return {string} - string representation of a random array with unique elements
 */
const generateArrEleUnique = (size, minEle, maxEle, sorted=false,increasingOrder=true) => {
  console.log(
    `\x1b[35mgenerateArrEleUnique() -  \x1b[36mgenerating unique array...\x1b[0m`
  );
  const elements = new Set();
  while (elements.size < size) {
    let rand = randomNoInRange(minEle, maxEle);
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

/**
 * generateArr - generate a string representation of a random array
 *  @param {number} size - size of array
 *  @param {number} minEle - minimum possible element
 *  @param {number} maxEle - maximum possible element
 *  @param {boolean} sorted - should the array be sorted
 *  @param {boolean} increasingOrder - is the order increasing
 *  @return {string} - string representation of a random array
 */
const generateArr = (size, minEle, maxEle, sorted=false, increasingOrder = true) => {
  console.log(`\x1b[35mgenerateArr() -  \x1b[36mgenerating array...\x1b[0m`);
  let elements = [];
  while (size--) {
    let rand = randomNoInRange(minEle, maxEle);
    elements.push(rand);
  }
  elements = sorted
    ? increasingOrder
      ? elements.sort((a, b) => a - b)
      : elements.sort((a, b) => b - a)
    : elements;
  return "[" + elements.join(",") + "]";
};
