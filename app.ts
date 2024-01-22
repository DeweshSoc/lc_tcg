/**
 * @file app.js is the root file for this test case generator API
 *  @author Dewesh Jha
 *  @see <a href="https://deweshsoc.github.io/Portfoliov2">Dewesh</a>
 */

import * as path from 'path' 
import dotenv from 'dotenv'

dotenv.config();

import express, { NextFunction, Request, Response } from 'express'
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerDoc from './src/json/swagger.json'


//app settings
const app = express();

//routers
import {apiRoute} from './src/routes/index';
import { ErrorResponse } from './src/interfaces';

//configuration middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// cors error handling middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// api route middleware
app.use("/api", apiRoute);

// documentation route middleware
const swaggerOptions:swaggerUI.SwaggerUiOptions = { 
  customCssUrl: '/static/swagger/main.css',
  customSiteTitle: "LC Tcg API",
  customfavIcon: "/static/swagger/assets/images/favicon/favicon.ico" 
};
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc,swaggerOptions));

//default route middleware
app.use("/", (req, res, next) => {
  const err = new Error("BAD REQUEST : invalid endpoint url");
  // err.status = 400;
  throw err;
});


// error-handling
app.use((err:ErrorResponse, req:Request, res:Response, next:NextFunction) => {
  console.log(`\x1b[41m\x1b[1m\x1b[97m `,err.stack,`\x1b[0m`);
  err.message = err.status ? err.message : "Some server error occured.";
  res.status(err.status || 500).json({ error: err });
  console.log(`\x1b[42m\x1b[30m\x1b[1mERROR HANDLED\x1b[0m`);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = '5000';
}

app.listen(port, () => {
  console.log(`Server up at ${port}`);
});
