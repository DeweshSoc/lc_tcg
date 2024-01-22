/**
 *  isSortedArrayReqInvalid - checks if req.body object is invalid
 *
 * @param {express.Request.body} body - JS object obtained after parsing json request body attached by user
 * @return {boolean} - returns true if body is invalid
 */
export const isSortedArrayReqInvalid = (body:Record<string,any>) => {
  console.log(
    `\x1b[35misSortedArrayReqInvalid() - \x1b[36mvalidating request body...\x1b[0m`
  );
  const { minSz, maxSz, minEle, maxEle, areEleUnique, increasingOrder } = body;
  const areTypeOK =
    typeof minSz === "number" &&
    typeof maxSz === "number" &&
    typeof minEle === "number" &&
    typeof maxEle === "number" &&
    typeof areEleUnique === "boolean" &&
    typeof increasingOrder === "boolean";
  const areValuesValid =
    minSz &&
    maxSz &&
    minEle && 
    maxEle &&
    areEleUnique !== undefined &&
    increasingOrder !== undefined;
  const areValuesInRange =
    minSz > 0 &&
    maxSz <= 100000 &&
    minSz <= maxSz &&
    minEle >= -1000000000 &&
    maxEle <= 1000000000 &&
    minEle <= maxEle;
  return !(areTypeOK && areValuesValid && areValuesInRange);
};

