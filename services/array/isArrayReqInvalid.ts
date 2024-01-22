
/**
 *  isArrayReqInvalid - checks if req.body object is invalid
 *
 * @param {express.Request.body} body - JS object obtained after parsing json request body attached by user
 * @return {boolean} - returns true if body is invalid
 */
const isArrayReqInvalid = (body:any) => {
  console.log(
    `\x1b[35misArrayReqInvalid() - \x1b[36mvalidating request body...\x1b[0m`
  );
  const { count, minSz, maxSz, minEle, maxEle, areEleUnique } = body;
  const areTypeOK =
    typeof count === "number" &&
    typeof minSz === "number" &&
    typeof maxSz === "number" &&
    typeof minEle === "number" &&
    typeof maxEle === "number" &&
    typeof areEleUnique === "boolean";
  const areValuesValid =
    count && minSz && maxSz && minEle && maxEle && areEleUnique != undefined;
  const areValuesInRange =
    count <= 5 &&
    minSz > 0 &&
    maxSz <= 100000 &&
    minSz <= maxSz &&
    minEle >= -1000000000 &&
    maxEle <= 1000000000 &&
    minEle <= maxEle;
    console.log(areTypeOK,areValuesInRange,areValuesValid);
  return !(areTypeOK && areValuesValid && areValuesInRange);
};


export default isArrayReqInvalid;