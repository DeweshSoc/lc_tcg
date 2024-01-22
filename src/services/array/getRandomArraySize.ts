import { ErrorResponse } from "../../interfaces";
import {getRandomNoInRange} from "../index";





/**
 *
 * getRandomArraySize - get random array size within given range
 * @param {number} minSz - lower bound of arr.length range
 * @param {number} maxSz - upper bound of arr.length range
 * @param {number} minEle - lower bound of arr[i] range
 * @param {number} maxEle - upper bound of arr[i] range
 * @param {boolean} areEleUnique - true if array should contain unique elements
 * @return {number} - returns number denoting random array size
 */
export const getRandomArraySize = (
    minSz:number, 
    maxSz:number, 
    minEle:number, 
    maxEle:number, 
    areEleUnique:boolean
  ):number => {
  console.log(`\x1b[35mgetRandomArraySize() - \x1b[36mgenerating random array size...\x1b[0m`);
  let sizeOfArray = getRandomNoInRange(minSz, maxSz);
  if (areEleUnique) {
    let trial = 10;
    console.log(`trying size ${sizeOfArray}...`);
    while (sizeOfArray > maxEle - minEle + 1 && trial--) {
      sizeOfArray = getRandomNoInRange(minSz, maxSz);
      console.log(`trying size ${sizeOfArray}...`);
    }
    if (trial <= 0) {
      console.log(`\x1b[35mgetRandomArraySize() - \x1b[36mall trials expired\x1b[0m`);
      const err = new Error(`arr[i] range is smaller than maximum possible size of arr`) as ErrorResponse;
      err.status = 422;
      throw err;
    }
  }
  return sizeOfArray;
};

