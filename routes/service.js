/**
 * @file servie.js is the main router 
 */
const express = require("express");

const router = express.Router();

const arrayController = require("../controllers/array");
//code here

router.get("/arrays/0", arrayController.getRandomArray);
router.post("/arrays/1", arrayController.getCustomArrays);

module.exports = router;
