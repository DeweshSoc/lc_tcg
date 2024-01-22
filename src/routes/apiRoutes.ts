/**
 * @file servie.js is the main router 
 */
// const express = require("express");
import express from 'express';
const router = express.Router();

// const arrayController = require("../controllers/array");
import * as arrayController from '../controllers/array';
import * as treeController from '../controllers/tree';


//code here

router.get("/arrays/0", arrayController.getRandomArray);
router.post("/arrays/1", arrayController.getCustomArrays);
router.post("/arrays/2", arrayController.getCustomSortedArray);

router.get("/trees/0", treeController.getRandomTree);

export const apiRoute = router;