const express = require("express");
const generateTree = require("../utils/tree/generateTree");


/**
 * Tree module
 * @module trees-controller
 *
 */

/**
 * getRandomTree - sends an array of string representation of random tree as response
 *
 * @param {express.Request} req - express request object
 * @param {express.Response} res - express response object
 * @param {express.NextFunction} next - express next function
 */
exports.getRandomTree = (req, res, next) => {
  console.log(
    `\x1b[42m\x1b[30m\x1b[1mgetRandomTree handler - executing request\x1b[0m`
  );
  const newTree = generateTree(1000,1,20);
  const payload = {
    count: 1,
    size: `[1,1001]`,
    trees: [newTree],
    status: "ok",
    message: "1 tree generated",
  };
  res.status(200).json(payload);
  console.log(
    `\x1b[42m\x1b[30m\x1b[1mgetRandomTree handler - response sent\x1b[0m`
  );
};
