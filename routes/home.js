const express = require("express");

const isAuth = require("../middleware/isAuth");

const router = express.Router();

const homeController = require('../controllers/home');

//code here
router.post('/',isAuth,homeController.postPost);
router.get('/:postId',isAuth,homeController.getPost);

module.exports = router;
