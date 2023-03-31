/**
 * @file servie.js is the main router 
 */
const express = require("express");

const router = express.Router();

const arrayController = require("../controllers/array");
const treeController = require("../controllers/tree");
//code here

router.get("/arrays/0", arrayController.getRandomArray);
router.post("/arrays/1", arrayController.getCustomArrays);
router.post("/arrays/2", arrayController.getCustomSortedArray);

router.get("/trees/0", treeController.getRandomTree);

module.exports = router;
