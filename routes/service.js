const express = require("express");

const router = express.Router();

const arrayController = require("../controllers/array");
//code here

router.get('/arrays/0',arrayController.getRandomArray);


module.exports = router;
