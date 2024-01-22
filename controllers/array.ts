import {Response,Request,NextFunction} from 'express';

import generateArray from '../services/array/generateArray';
import generateUniqueArray from '../services/array/generateUniqueArray';
import getRandomArraySize from '../services/array/getRandomArraySize';
import isArrayReqInvalid from '../services/array/isArrayReqInvalid';
import isSortedArrayReqInvalid from '../services/array/isSortedArrayReqInvalid';
import { ErrorResponse } from '../interfaces';

// import 


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
export const getRandomArray = (req:Request, res:Response, next:NextFunction) => {
  console.log(
    `\x1b[42m\x1b[30m\x1b[1mgetRandomArray handler - executing request\x1b[0m`
  );
  const n = Math.floor(Math.random() * (1001 - 0) + 0);
  const newArray = generateArray(n, 1, 1001);
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

export const getCustomArrays = (req:Request, res:Response, next:NextFunction) => {
  console.log(
    `\x1b[42m\x1b[30m\x1b[1mgetCustomArrays handler - executing request\x1b[0m`
  );
  console.table(req.body);
  const { count, minSz, maxSz, minEle, maxEle, areEleUnique } = req.body;
  if (isArrayReqInvalid(req.body)) {
    const err = new Error("Invalid input for the requested endpoint") as ErrorResponse;
    err.status = 422;
    throw err;
  }
  const arrays: Array<string> = [];
  let N = count;
  while (N--) {
    let sizeOfArray = getRandomArraySize(minSz, maxSz, minEle, maxEle, areEleUnique);
    if(areEleUnique){
      arrays.push(generateUniqueArray(sizeOfArray,minEle,maxEle));
    }else{
      generateArray(sizeOfArray, minEle, maxEle)
    }
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
export const getCustomSortedArray = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `\x1b[42m\x1b[30m\x1b[1mgetCustomSortedArrays handler - executing request\x1b[0m`
  );
  console.table(req.body);
  const { minSz, maxSz, minEle, maxEle,areEleUnique,increasingOrder } =
    req.body;
  if (isSortedArrayReqInvalid(req.body)) {
    const err = new Error("Invalid input") as ErrorResponse;
    err.status = 422;
    throw err;
  }
  let sizeOfArray = getRandomArraySize(minSz, maxSz, minEle, maxEle, areEleUnique);
  const array = areEleUnique === true
    ? generateUniqueArray(sizeOfArray, minEle, maxEle, true,increasingOrder)
    : generateArray(sizeOfArray, minEle, maxEle, true,increasingOrder);
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













